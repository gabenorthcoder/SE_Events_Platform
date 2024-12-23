import express, { Request, Response } from "express";
import { ListUserEventsUseCase } from "../../../application/useCases/listUserEventsUseCase";

const listUserEvents = express.Router();

listUserEvents.get("/:id/events", async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Event ID from the route parameter
    const numericId = Number(id);

    // Check if numericId is a positive integer
    if (!Number.isInteger(numericId) || numericId <= 0) {
      res.status(400).json({
        message: "Invalid ID. It must be a positive integer greater than 0.",
      });
      return;
    }
    const useCase = new ListUserEventsUseCase();
    const events = await useCase.execute(Number(id));
    res.status(200).json(events);
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    res.status(401).json({ message: errorMessage });
  }
});

export { listUserEvents };
