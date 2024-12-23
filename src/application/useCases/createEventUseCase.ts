import { EventRepository } from "../../infrastructure/repository/eventRepository";
import { Event } from "../../infrastructure/repository/entities/event";
import { CreateEventInput } from "../../domain/createEvent";
import { User, UserRole } from "../../infrastructure/repository/entities/user";

export class CreateEventUseCase {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(eventData: CreateEventInput, user: User): Promise<Event> {
    // Create and save the event
    const newEvent = await this.eventRepository.createEvent({
      ...eventData,
      date: new Date(eventData.date), // Convert string to Date object
      createdBy: user, // Associate the event with the user
      isActive: true,
    });

    return newEvent; // Return the saved event
  }
}
