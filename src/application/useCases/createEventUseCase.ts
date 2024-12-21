import { EventRepository } from "../../infrastructure/repository/eventRepository";
import { Event } from "../../infrastructure/repository/entities/event";
import { CreateEvent } from "../../domain/createEvent";
import { User, UserRole } from "../../infrastructure/repository/entities/user";

export class CreateEventUseCase {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(eventData: CreateEvent, user: User): Promise<Event> {
    if (!user || user.role !== UserRole.STAFF) {
      throw new Error("Unauthorized: User is required");
    }

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
