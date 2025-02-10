import { BaseEntity } from "@base/entity";
import { User } from "@modules/users/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { BookingStatus } from "../enums/booking.enum";

@Entity('bookings')
export class Booking extends BaseEntity {
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({ type: 'timestamp' })
    booking_time: Date

    @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
    status: string
}