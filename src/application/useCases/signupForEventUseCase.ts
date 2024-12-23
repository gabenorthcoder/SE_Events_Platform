import { EventRepository } from "../../infrastructure/repository/eventRepository";
import { UserEventRepository } from "../../infrastructure/repository/userEventRespository";
import { Event } from "../../infrastructure/repository/entities/event";
import { User } from "../../infrastructure/repository/entities/user";

export class SignupEventUseCase {
  private eventRepository: EventRepository;
  private userEventRepository: UserEventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
    this.userEventRepository = new UserEventRepository();
  }

  async execute(
    eventId: number,
    user: User
  ): Promise<{ event: Event; user: User }> {
    // Check if the event exists and is active
    const event = await this.eventRepository.findEventById(eventId);
    if (!event || !event.isActive || new Date(event.date) < new Date()) {
      throw new Error("Event not found, expired, or is no longer active");
    }

    // Check if the user is already signed up for the event
    const existingSignup = await this.userEventRepository.findUserEvent(
      user.id,
      eventId
    );
    if (existingSignup) {
      throw new Error("User is already signed up for this event");
    }

    // Create a new user-event association
    await this.userEventRepository.createUserEvent(user, event);

    return { event, user };
  }
}
