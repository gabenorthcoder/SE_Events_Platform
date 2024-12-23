import { EventRepository } from "../../infrastructure/repository/eventRepository";
import { Event } from "../../infrastructure/repository/entities/event";
import { User, UserRole } from "../../infrastructure/repository/entities/user";
import { sanitizeEvents, SanitizedEvent } from "../../utils/sanitizeEvents";

export class GetEventsUseCase {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(loggedUser: User): Promise<SanitizedEvent[]> {
    if (loggedUser.role === UserRole.USER) {
      const activeEvents = await this.eventRepository.findAllActiveEvents();
      return activeEvents;
    }
    // Fetch active events from the repository
    const allEvents = await this.eventRepository.findAllEvents();
    return sanitizeEvents(allEvents);
  }
}
