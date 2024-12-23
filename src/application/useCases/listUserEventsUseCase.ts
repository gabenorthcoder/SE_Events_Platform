import { UserEventRepository } from "../../infrastructure/repository/userEventRespository";
import { UserRepository } from "../../infrastructure/repository/userRepository";
import { Event } from "../../infrastructure/repository/entities/event";
import { UserEvent } from "../../infrastructure/repository/entities/userEvent";
import { User, UserRole } from "../../infrastructure/repository/entities/user";

export class ListUserEventsUseCase {
  private userRepository: UserRepository;
  private userEventRepository: UserEventRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.userEventRepository = new UserEventRepository();
  }

  async execute(
    loggedUser: User,
    userId: number
  ): Promise<Event[] | UserEvent[]> {
    // If the logged user is an Admin or Staff, return all user events
    if (
      loggedUser.role === UserRole.ADMIN ||
      loggedUser.role === UserRole.STAFF
    ) {
      const allUserEvents = await this.userEventRepository.findAllUserEvents();
      return allUserEvents;
    }

    // If the logged user is not Admin/Staff and the provided userId doesn't match the logged user, throw an error
    if (loggedUser.id !== userId) {
      throw new Error("Unauthorized access");
    }

    // Fetch and return the events for the specific user
    const events = await this.userEventRepository.findEventsByUserId(userId);
    return events;
  }
}
