import express, { Request, Response } from "express";
import { SignupEventUseCase } from "../../../application/useCases/signupForEventUseCase";
import { User } from "../../../infrastructure/repository/entities/user";
import { isEventSignUpBody } from "../../../domain/signUpEvent";
import { formatZodError } from "../../../utils/requestChecker";

const signupEvent = express.Router();

signupEvent.post("/:id/signup", async (req: Request, res: Response) => {
  try {
    const body = req.body as unknown;

    // Validate the request body using Zod
    const isValidBody = isEventSignUpBody(body);

    if (!isValidBody.success) {
      const formattedError = formatZodError(isValidBody.error!);
      res.status(400).json(formattedError);
      return;
    }

    // Extract the validated data
    const validEventData = isValidBody.data!;
    const { id } = req.params; // Event ID from the route parameter
    const numericId = Number(id);

    // Check if numericId is a positive integer
    if (!Number.isInteger(numericId) || numericId <= 0) {
      res.status(400).json({
        message: "Invalid ID. It must be a positive integer greater than 0.",
      });
      return;
    }

    // Get the authenticated user (from middleware, assume `req.user` exists)
    const user = req.user as User | undefined;
    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not authenticated" });
      return;
    }

    // Use the use case to sign up for the event
    const useCase = new SignupEventUseCase();
    const signupResult = await useCase.execute(
      Number(id),
      user,
      validEventData.flag
    );

    res.status(201).json({
      message: "User successfully signed up for the event",
      signup: signupResult,
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    res.status(400).json({ message: errorMessage });
  }
});

export { signupEvent };
