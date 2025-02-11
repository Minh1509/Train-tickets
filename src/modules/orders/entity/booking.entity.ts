import { BaseEntity } from "@base/entity";
import { User } from "@modules/users/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BookingStatus } from "../enums/booking.enum";
import { Ticket } from "./ticket.entity";

@Entity('bookings')
export class Booking extends BaseEntity {
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    booking_time: Date

    @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
    status: string

    @OneToMany(() => Ticket, (ticket) => ticket.id)
    tickets: Ticket[]
}