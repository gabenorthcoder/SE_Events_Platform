import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Event } from "./event";

@Entity()
export class UserEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userEvents)
  @JoinColumn({ name: "userId" }) // This will create a column 'userId' in the join table
  user: User;

  @ManyToOne(() => Event, (event) => event.userEvents)
  @JoinColumn({ name: "eventId" }) // This will create a column 'eventId' in the join table
  event: Event;
}
