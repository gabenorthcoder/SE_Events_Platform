import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { UserEvent } from "./userEvent";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ type: "uuid", nullable: false })
  uuid: string;

  @Column("text")
  title: string;

  @Column("text")
  description: string;

  @Column({ type: "jsonb", nullable: true })
  location: { lat: number; lon: number };

  @Column("date")
  date: Date;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.createdEvents)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.updatedEvents)
  updatedBy: User;

  // Add this relationship
  @OneToMany(() => UserEvent, (userEvent) => userEvent.event)
  userEvents: UserEvent[]; // This is the reverse side of the relationship

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
