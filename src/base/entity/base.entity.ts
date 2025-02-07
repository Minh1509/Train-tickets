
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

type AuditUser = {
    id?: number;
    fullName?: string
    username?: string
}

export class BaseId {
    @PrimaryGeneratedColumn()
    id: number
}

export class BaseCreateBy {
    @Column({ type: 'json', nullable: true })
    createdBy: AuditUser
}
export class BaseUserEntity extends BaseId {
    @Column({ type: 'json', nullable: true })
    updatedBy: AuditUser;

    @Column({ type: 'json', nullable: true })
    deletedBy: AuditUser;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean
}
export class BaseEntity extends BaseId {

    @Column({ type: 'json', nullable: true })
    createdBy: AuditUser;

    @Column({ type: 'json', nullable: true })
    updatedBy: AuditUser;

    @Column({ type: 'json', nullable: true })
    deletedBy: AuditUser;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean
}
