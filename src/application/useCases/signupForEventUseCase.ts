import { EventRepository } from "../../infrastructure/repository/eventRepository";
import { UserEventRepository } from "../../infrastructure/repository/userEventRespository";
import { User } from "../../infrastructure/repository/entities/user";
import { UserEvent } from "../../infrastructure/repository/entities/userEvent";

export class SignupEventUseCase {
  private eventRepository: EventRepository;
  private userEventRepository: UserEventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
    this.userEventRepository = new UserEventRepository();
  }

  async execute(
    eventId: number,
    user: User,
    flag: boolean
  ): Promise<UserEvent | string> {
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

    // If the flag is false and the user is already signed up, undo the signup
    if (flag === false && existingSignup) {
      await this.userEventRepository.undoUserEvent(existingSignup);
      return `Your event signup has been canceled`;
    }

    // If the flag is true and the user is not already signed up, create a new signup
    if (flag === true && !existingSignup) {
      const signUpEvent = await this.userEventRepository.createUserEvent(
        user,
        event
      );

      // Remove the password field from the user object
      const { password, ...userWithoutPassword } = signUpEvent.user;

      // Merge the sanitized user object back into the event
      const signUpEventWithoutPassword = {
        ...signUpEvent,
        user: userWithoutPassword,
      };

      return signUpEventWithoutPassword as UserEvent;
    }

    // If flag is true but the user is already signed up, return a message
    if (flag === true && existingSignup) {
      throw new Error("User is already signed up for this event");
    }

    // If flag is false but there's no existing signup, return a message
    if (flag === false && !existingSignup) {
      throw new Error("User is not signed up for this event");
    }

    // Default return
    return "Unexpected error occurred";
  }
}
