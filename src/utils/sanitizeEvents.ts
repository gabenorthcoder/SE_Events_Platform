interface User {
  id: number;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: number;
  authType: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SanitizedEvent {
  id: number;
  uuid: string;
  title: string;
  description: string;
  location: { lat: number; lon: number };
  date: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: User | null;
  updatedBy: User | null;
}

// Utility function to sanitize events
export function sanitizeEvents(events: SanitizedEvent[]): SanitizedEvent[] {
  if (!events || events.length === 0) return []; // Return empty array if no events

  return events.map((event) => ({
    ...event,
    createdBy: event.createdBy
      ? { ...event.createdBy, password: undefined }
      : null,
    updatedBy: event.updatedBy
      ? { ...event.updatedBy, password: undefined }
      : null,
  }));
}
