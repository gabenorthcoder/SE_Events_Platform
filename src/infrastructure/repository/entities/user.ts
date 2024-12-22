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
  ADMIN = 0,
  STAFF = 1,
  USER = 2,
}

export enum UserAuthType {
  LOCAL = 1,
  GOOGLE = 2,
  FACEBOOK = 3,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ type: "uuid", nullable: false })
  uuid: string;

  @Column({ type: "text", nullable: false })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text", nullable: false })
  firstName: string;

  @Column("text")
  lastName: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  @Column({
    type: "enum",
    default: UserAuthType.LOCAL,
    enum: UserAuthType,
  })
  authType: UserAuthType;

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
