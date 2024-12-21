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
import { Event } from "./event";
import { UserEvent } from "./userEvent";

export enum UserRole {
  STAFF = 0,
  USER = 1,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ type: "uuid", nullable: false })
  uuid: string;

  @Column({ type: "text", unique: true, nullable: false })
  email: string;

  @Column("text")
  password: string;

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

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
