import { AppDataSource } from "./dataSource";
import { UserEvent } from "./entities/userEvent";
import { User } from "./entities/user";
import { Event } from "./entities/event";

export class UserEventRepository {
  private userEventRepository = AppDataSource.getRepository(UserEvent);

  async findUserEvent(
    userId: number,
    eventId: number
  ): Promise<UserEvent | null> {
    const userEvent = await this.userEventRepository.findOne({
      where: {
        user: { id: userId },
        event: { id: eventId },
      },
    });

    return userEvent;
  }
  async findEventsByUserId(userId: number): Promise<Event[]> {
    const userEvents = await this.userEventRepository.find({
      where: { user: { id: userId } },
      relations: ["event"], // Include the event details
    });

    // Extract and return the event details
    return userEvents.map((userEvent) => userEvent.event);
  }

  async createUserEvent(user: User, event: Event): Promise<UserEvent> {
    const userEvent = this.userEventRepository.create({ user, event });
    return await this.userEventRepository.save(userEvent);
  }
}
