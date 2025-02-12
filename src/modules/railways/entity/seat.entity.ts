import { BaseEntity } from "@base/entity";
import { Carriage } from "@modules/railways/entity/carriage.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TypeSeat } from "../enums/seat.enum";

@Entity({ name: 'seats' })
export class Seat extends BaseEntity {
    @ManyToOne(() => Carriage, (carriage) => carriage.seats)
    @JoinColumn({ name: "carriageId" })
    carriage: Carriage

    @Column({ type: 'enum', enum: TypeSeat, default: TypeSeat.NORMAL })
    seat_type: string

    @Column()
    seat_number: number

    @Column({ type: 'boolean', default: true })
    is_available: string
}