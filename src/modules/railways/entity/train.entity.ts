import { BaseEntity } from "@base/entity";
import { Column, Entity, OneToMany } from "typeorm";
import { StatusEntity } from "@base/api/enums/status.enum";
import { Carriage } from "./carriage.entity";
import { Schedule } from "@modules/schedules/entity/schedule.entity";
import { TypeTrain } from "../enums";

@Entity('trains')
export class Train extends BaseEntity {
    @Column()
    name: string

    @Column({ unique: true, nullable: false })
    code: string

    @Column({ type: 'enum', enum: TypeTrain, default: TypeTrain.NORMAL })
    train_type: string

    @Column({ type: 'enum', enum: StatusEntity, default: StatusEntity.ACTIVE })
    status: string

    @OneToMany(() => Carriage, (carriage) => carriage.train)
    carriages: Carriage[]

    @OneToMany(() => Schedule, (schedule) => schedule.train)
    schedules: Schedule[]
}