import { EventRepository } from "../../infrastructure/repository/eventRepository";
import logger from "../../utils/logger";

export class DeleteEventUseCase {
  private eventRepository: EventRepository;
  constructor() {
    this.eventRepository = new EventRepository();
  }
  async execute(eventId: number): Promise<void> {
    // Validate the event exists
    const event = await this.eventRepository.findEventById(eventId);
    if (!event) {
      logger.warn(`Event Deletion: Event with id ${eventId} not found`);
      throw new Error("Event not found");
    }

    // Soft delete the event
    await this.eventRepository.deleteEvent(eventId);
  }
}
