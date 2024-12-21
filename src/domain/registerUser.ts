import { z } from "zod";
import { UserRole } from "../infrastructure/repository/entities/user";

const userRoleSchema = z.union(
  [z.literal(UserRole.STAFF), z.literal(UserRole.USER)],
  {
    errorMap: () => ({ message: "Value must be either 0 (STAFF) or 1 (USER)" }),
  }
);

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/^[a-zA-Z0-9]*$/, { message: "Password must be alphanumeric" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  role: userRoleSchema,
});

export type UserRegistration = z.infer<typeof userRegistrationSchema>;

export const isUserRegistrationBody = (
  value: unknown
): { success: boolean; error?: z.ZodError; data?: UserRegistration } => {
  const validationResult = userRegistrationSchema.safeParse(value);
  if (validationResult.success) {
    return { success: true, data: validationResult.data as UserRegistration };
  }
  return { success: false, error: validationResult.error };
};
