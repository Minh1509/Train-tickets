import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./entity/booking.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Booking])]

})

export class OrderModule { }