import { config } from "@config";
import { Booking } from "@modules/orders/entity/booking.entity";
import { Ticket } from "@modules/railways/entity/ticket.entity";
import { Carriage } from "@modules/railways/entity/carriage.entity";
import { Station } from "@modules/railways/entity/station.entity";
import { Train } from "@modules/railways/entity/train.entity";
import { User } from "@modules/users/entity/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seat } from "@modules/railways/entity/seat.entity";
import { Schedule } from "@modules/railways/entity/schedule.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: config.DB_HOST,
            port: config.DB_PORT,
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            entities: [User, Station, Train, Carriage, Seat, Schedule, Ticket, Booking],
            autoLoadEntities: true,
            synchronize: false,
            // logging: true
        })
    ]
})
export class InitMysql { }
