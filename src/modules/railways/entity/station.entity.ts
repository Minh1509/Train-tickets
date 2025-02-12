import { StatusEntity } from "@base/api/enums/status.enum";
import { BaseEntity } from "@base/entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: 'stations' })
export class Station extends BaseEntity {
    @Column({ unique: true })
    name: string

    @Column()
    location: string

    @Column({ type: 'enum', enum: StatusEntity, default: StatusEntity.ACTIVE })
    status: boolean

}