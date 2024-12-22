import { UserEventRepository } from "../../infrastructure/repository/userEventRespository";
import { UserRepository } from "../../infrastructure/repository/userRepository";
import { Event } from "../../infrastructure/repository/entities/event";

export class ListUserEventsUseCase {
  private userRepository: UserRepository;
  private userEventRepository: UserEventRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.userEventRepository = new UserEventRepository();
  }

  async execute(userId: number): Promise<Event[]> {
    // Validate the user exists
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Fetch the events the user has signed up for
    const events = await this.userEventRepository.findEventsByUserId(user.id);

    return events;
  }
}
