// // src/payment/payment.entity.ts
// import { Booking } from '@modules/orders/entity/booking.entity';
// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


// @Entity()
// export class Payment {
//     @PrimaryGeneratedColumn()
//     payment_id: number;

//     @ManyToOne(() => Booking)
//     booking: Booking;

//     @Column('decimal', { precision: 10, scale: 2 })
//     amount: number;

//     @Column()
//     payment_method: string; // e.g., credit card, PayPal

//     @Column()
//     payment_status: string; // e.g., completed, pending, failed

//     @Column()
//     payment_time: Date;

//     @CreateDateColumn()
//     created_at: Date;

//     @UpdateDateColumn()
//     updated_at: Date;
// }

// import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Booking } from "../../bookings/entities/booking.entity";

// @Entity('payments')
// export class Payment extends BaseEntity {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @ManyToOne(() => Booking, (booking) => booking.id, { onDelete: 'CASCADE' })
//     booking: Booking;

//     @Column({ type: 'enum', enum: ['CREDIT_CARD', 'BANK_TRANSFER', 'E_WALLET'] })
//     payment_method: string;

//     @Column({ type: 'decimal', precision: 10, scale: 2 })
//     amount: number;

//     @Column({ type: 'enum', enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' })
//     payment_status: string;

//     @Column({ nullable: true })
//     transaction_id: string;
// }
