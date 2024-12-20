import express, { Request, Response } from "express";
import { SignupEventUseCase } from "../../../application/useCases/SignupForEventUseCase";
import { User } from "../../../infrastructure/repository/entities/user";

const signupEvent = express.Router();

signupEvent.post("/:id/signup", async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Event ID from the route parameter

    // Get the authenticated user (from middleware, assume `req.user` exists)
    const user = req.user as User | undefined;
    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not authenticated" });
      return;
    }

    // Use the use case to sign up for the event
    const signupForEventUseCase = new SignupEventUseCase();
    const signupResult = await signupForEventUseCase.execute(Number(id), user);

    res.status(201).json({
      message: "User successfully signed up for the event",
      signup: signupResult,
      user: user,
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    res.status(400).json({ message: errorMessage });
  }
});

export { signupEvent };
