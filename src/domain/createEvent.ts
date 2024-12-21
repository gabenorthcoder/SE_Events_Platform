import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z
    .object({
      lat: z.number({ required_error: "Latitude is required" }),
      lon: z.number({ required_error: "Longitude is required" }),
    })
    .optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export type CreateEvent = z.infer<typeof createEventSchema>;

export const isCreateEventBody = (
  value: unknown
): { success: boolean; error?: z.ZodError; data?: CreateEvent } => {
  const validationResult = createEventSchema.safeParse(value);
  if (validationResult.success) {
    return { success: true, data: validationResult.data as CreateEvent };
  }
  return { success: false, error: validationResult.error };
};
