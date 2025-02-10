import { StatusEntity } from "@base/api/enums/status.enum";
import { BaseEntity } from "@base/entity";
import { Column, Entity } from "typeorm";

@Entity('stations')
export class Station extends BaseEntity {
    @Column({ unique: true })
    name: string

    @Column()
    location: string

    @Column({ type: 'enum', enum: StatusEntity, default: StatusEntity.ACTIVE, nullable: true })
    status: boolean
}