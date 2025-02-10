// src/payment/payment.entity.ts
import { Booking } from '@modules/orders/entity/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    payment_id: number;

    @ManyToOne(() => Booking)
    booking: Booking;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    payment_method: string; // e.g., credit card, PayPal

    @Column()
    payment_status: string; // e.g., completed, pending, failed

    @Column()
    payment_time: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}