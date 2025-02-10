
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

type AuditUser = {
    userId?: number;
    username?: string
}

export class BaseId {
    @PrimaryGeneratedColumn()
    id: number
}

export class BaseCreatedBy extends BaseId {
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
export class BaseEntity extends BaseCreatedBy {

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
