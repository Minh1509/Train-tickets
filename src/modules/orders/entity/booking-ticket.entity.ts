// src/booking-ticket/booking-ticket.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Booking } from './booking.entity';
import { Ticket } from './ticket.entity';

@Entity("booking-ticket")
export class BookingTicket {
    @PrimaryGeneratedColumn()
    booking_ticket_id: number;

    @ManyToOne(() => Booking)
    booking: Booking;

    @ManyToOne(() => Ticket)
    ticket: Ticket;
}