import { AppDataSource } from "./dataSource";
import { Event } from "./entities/event";

export class EventRepository {
  private eventRepository = AppDataSource.getRepository(Event);

  // Create and save a new event
  async createEvent(eventData: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create(eventData); // Create a new event instance
    return await this.eventRepository.save(event); // Save to the database
  }

  // Find an event by its ID
  async findEventById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
    });
    if (!event) {
      throw new Error(`Event with id ${id} not found this`);
    }
    return event;
  }

  // Find all active events
  async findAllActiveEvents(): Promise<Event[]> {
    const activeEvents = await this.eventRepository.find({
      where: { isActive: true },
      order: { date: "ASC" },
    });
    if (!activeEvents) {
      throw new Error("No active events found");
    }
    return activeEvents;
  }

  async findAllEvents(): Promise<Event[]> {
    const events = await this.eventRepository.find({
      relations: ["createdBy", "updatedBy"],
    });
    if (!events || events.length === 0) {
      throw new Error("No events found");
    }
    return events;
  }

  // Update an event
  async updateEvent(eventData: Event): Promise<Event> {
    const checkEvent = this.findEventById(eventData.id); // Check if the event exists
    if (!checkEvent) {
      throw new Error(`Event with id ${eventData.id} not found`);
    }
    return await this.eventRepository.save(eventData); // Save can also perform updates
  }

  // Soft delete an event (set `isActive` to false)
  async softDeleteEvent(id: number): Promise<void> {
    const checkEvent = this.findEventById(id); // Check if the event exists
    if (!checkEvent) {
      throw new Error(`Event with id ${id} not found`);
    }
    await this.eventRepository.update(id, { isActive: false });
  }

  async deleteEvent(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
