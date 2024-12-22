import express, { Request, Response } from "express";
import { UpdateEventUseCase } from "../../../application/useCases/updateEventUseCase";
import { formatZodError } from "../../../utils/requestChecker";
import { isUpdateEventBody } from "../../../domain/updateEvent";
import { User } from "../../../infrastructure/repository/entities/user";

const updateEvent = express.Router();

updateEvent.put("/:id/update", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = Number(id);

    // Check if numericId is a positive integer
    if (!Number.isInteger(numericId) || numericId <= 0) {
      res.status(400).json({
        message: "Invalid ID. It must be a positive integer greater than 0.",
      });
    }

    const body = req.body as unknown;
    const isValidBody = isUpdateEventBody(body);
    if (!isValidBody.success) {
      const formattedError = formatZodError(isValidBody.error!);
      res.status(400).json(formattedError);
      return;
    }
    const validEventData = isValidBody.data!;
    const user = req.user as User;
    const useCase = new UpdateEventUseCase();
    const updatedEvent = await useCase.execute(numericId, validEventData, user);
    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    res.status(400).json({ message: errorMessage });
  }
});

export { updateEvent };
