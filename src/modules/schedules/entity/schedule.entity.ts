import { BaseEntity } from "@base/entity";
import { Station } from "@modules/railways/entity/station.entity";
import { Train } from "@modules/railways/entity/train.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('schedules')
export class Schedule extends BaseEntity {
    @ManyToOne(() => Train, (train) => train.schedules, { nullable: false })
    @JoinColumn({ name: 'trainId' })
    train: Train

    @ManyToOne(() => Station, { nullable: false })
    @JoinColumn({ name: 'departure_station_id' })
    departure_station_id: Station

    @ManyToOne(() => Station, { nullable: false })
    @JoinColumn({ name: 'arrival_station_id' })
    arrival_station_id: Station

    @Column({ type: 'timestamp' })
    departure_time: Date

    @Column({ type: 'timestamp' })
    arrival_time: Date

}