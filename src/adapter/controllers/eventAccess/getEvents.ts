import express, { Request, Response } from "express";
import { GetEventsUseCase } from "../../../application/useCases/getEventsUseCase";

const getEvents = express.Router();

getEvents.get("/read", async (req: Request, res: Response) => {
  try {
    // Initialize the use case
    const useCase = new GetEventsUseCase();

    // Execute the use case to fetch all active events
    const events = await useCase.execute();

    res.status(200).json(events);
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    res.status(500).json({ message: errorMessage });
  }
});

export { getEvents };
