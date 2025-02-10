import { BaseEntity } from "@base/entity";
import { Column, Entity, OneToMany } from "typeorm";
import { TypeTrain } from "../enums/train.enum";
import { StatusEntity } from "@base/api/enums/status.enum";
import { Carriage } from "./carriage.entity";
import { Schedule } from "@modules/schedules/entity/schedule.entity";

@Entity('trains')
export class Train extends BaseEntity {
    @Column({ nullable: false, unique: true })
    name: string

    @Column({ type: 'enum', enum: TypeTrain, default: TypeTrain.NORMAL })
    train_type: string

    @Column({ type: 'enum', enum: StatusEntity, default: StatusEntity.ACTIVE })
    status: string

    @OneToMany(() => Carriage, (carriage) => carriage.train)
    carriages: Carriage[]

    @OneToMany(() => Schedule, (schedule) => schedule.train)
    schedules: Schedule[]
}