import { BaseEntity } from "@base/entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Schedule } from "./schedule.entity";
import { Seat } from "./seat.entity";
import { TicketStatus, TicketType } from "../enums/ticket.enum";

@Entity({ name: "tickets" })
export class Ticket extends BaseEntity {
  @ManyToOne(() => Schedule, (schedule) => schedule.id)
  @JoinColumn({ name: "scheduleId" })
  schedule: Schedule;

  @ManyToOne(() => Seat, (seat) => seat.id)
  @JoinColumn({ name: "seatId" })
  seat: Seat;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column({ type: "enum", enum: TicketType, default: TicketType.ADULT })
  ticket_type: string;

  @Column({ type: "enum", enum: TicketStatus, default: TicketStatus.AVAILABLE })
  ticket_status: string;
}
