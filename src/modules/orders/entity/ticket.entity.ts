import { BaseEntity } from "@base/entity";
import { Schedule } from "@modules/schedules/entity/schedule.entity";
import { Seat } from "@modules/schedules/entity/seat.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TicketStatus, TicketType } from "../enums/ticket.enum";

@Entity('tickets')
export class Ticket extends BaseEntity {
    @ManyToOne(() => Schedule)
    @JoinColumn({ name: 'schedule_id' })
    schedule: Schedule

    @ManyToOne(() => Seat)
    @JoinColumn({ name: 'seat_id' })
    seat: Seat

    @Column('decimal', { precision: 10, scale: 2 })
    price: number

    @Column({ type: 'enum', enum: TicketType, default: TicketType.ADULT })
    ticket_type: string

}