import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Train } from "./train.entity";
import { BaseEntity } from "@base/entity";
import { StatusCarriage, TypeCarriage } from "../enums";
import { Seat } from "./seat.entity";

@Entity({ name: 'carriages' })
export class Carriage extends BaseEntity {
    @ManyToOne(() => Train, (train) => train.carriages, { nullable: false })
    @JoinColumn({ name: 'trainId' })
    train: Train

    @Column({ type: 'enum', enum: TypeCarriage, default: TypeCarriage.NORMAL })
    carriage_type: string

    @Column()
    carriage_number: number

    @Column()
    capacity: number

    @Column({ type: 'enum', enum: StatusCarriage, default: StatusCarriage.ACTIVE })
    status: string

    @OneToMany(() => Seat, (seat) => seat.carriage)
    seats: Seat[]

}