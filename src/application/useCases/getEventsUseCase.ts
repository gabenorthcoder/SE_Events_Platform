import { EventRepository } from "../../infrastructure/repository/eventRepository";
import { Event } from "../../infrastructure/repository/entities/event";

export class GetEventsUseCase {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(): Promise<Event[]> {
    // Fetch active events from the repository
    const activeEvents = await this.eventRepository.findAllActiveEvents();
    return activeEvents;
  }
}
