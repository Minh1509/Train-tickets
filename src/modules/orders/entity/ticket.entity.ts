import { BaseEntity } from "@base/entity";
import { Schedule } from "@modules/schedules/entity/schedule.entity";
import { Seat } from "@modules/schedules/entity/seat.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TicketStatus, TicketType } from "../enums/ticket.enum";

@Entity('tickets')
export class Ticket extends BaseEntity {
    @ManyToOne(() => Schedule, (schedule) => schedule.id)
    @JoinColumn({ name: 'scheduleId' })
    schedule: Schedule

    @ManyToOne(() => Seat, (seat) => seat.id)
    @JoinColumn({ name: 'seatId' })
    seat: Seat

    @Column('decimal', { precision: 10, scale: 2 })
    price: number

    @Column({ type: 'enum', enum: TicketType, default: TicketType.ADULT })
    ticket_type: string

    @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.AVAILABLE })
    ticket_status: string

}