import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Train } from "./train.entity";
import { StatusCarriage, TypeCarriage } from "../enums/carriage.enum";
import { BaseEntity } from "@base/entity";
import { Seat } from "@modules/schedules/entity/seat.entity";

@Entity("carriages")
export class Carriage extends BaseEntity {
    @ManyToOne(() => Train, (train) => train.carriages)
    @JoinColumn({ name: 'trainId' })
    train: Train

    @Column({ type: 'enum', enum: TypeCarriage, default: TypeCarriage.NORMAL })
    carriage_type: string

    @Column()
    capacity: number

    @Column({ type: 'enum', enum: StatusCarriage, default: StatusCarriage.ACTIVE })
    status: string

    @OneToMany(() => Seat, (seat) => seat.carriage)
    seats: Seat[]

}