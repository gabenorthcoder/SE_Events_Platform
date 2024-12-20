import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Event } from "./event"; // Import Event
import { UserEvent } from "./userEvent"; // Import UserEvent

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ type: "uuid", nullable: false })
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column("text")
  password: string;

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Column({ default: false })
  isStaff: boolean;

  // One-to-many relation for created events
  @OneToMany(() => Event, (event) => event.createdBy)
  createdEvents: Event[];

  // One-to-many relation for updated events
  @OneToMany(() => Event, (event) => event.updatedBy)
  updatedEvents: Event[];

  // One-to-many relation for user events
  @OneToMany(() => UserEvent, (userEvent) => userEvent.user)
  userEvents: UserEvent[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
