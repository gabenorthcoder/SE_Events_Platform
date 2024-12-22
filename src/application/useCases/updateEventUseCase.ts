import { EventRepository } from "../../infrastructure/repository/eventRepository";
import { User } from "../../infrastructure/repository/entities/user";
import { Event } from "../../infrastructure/repository/entities/event";
import { updateEventInput } from "../../domain/updateEvent";
import _ from "lodash";
import logger from "../../utils/logger";

export class UpdateEventUseCase {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(
    eventId: number,
    data: updateEventInput,
    staffUser: User
  ): Promise<Event> {
    // Validate the event exists
    const event = await this.eventRepository.findEventById(eventId);
    if (!event) {
      logger.warn(`Event Update: Event with id ${eventId} not found`);
      throw new Error("Event not found");
    }

    // Update only the fields provided in the input
    _.merge(event, data);

    // Set the updatedBy field
    event.updatedBy = staffUser;

    // Save the changes
    return await this.eventRepository.updateEvent(event);
  }
}
