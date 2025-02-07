/* eslint-disable prettier/prettier */
import { Column, Entity } from "typeorm";
import { BaseUserEntity } from "@base/entity";
import { Role } from "@base/authorization";
import { EnumGender } from "../enums/user.enum";

@Entity({ name: 'users' })
export class User extends BaseUserEntity {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    fullName: string

    @Column()
    dateOfBirth: Date

    @Column({ type: 'enum', enum: EnumGender, default: EnumGender.Other })
    gender: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    location: string

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: string

    @Column({ nullable: true })
    refToken: string
}
