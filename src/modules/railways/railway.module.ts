import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Station } from "./entity/station.entity";
import { AdminStationController } from "./controllers/admin-station.controller";
import { AdminStationService } from "./services/admin-station.service";
import { IsNameStationValidator } from "./validators/validator";
import { AdminTrainController } from "./controllers/admin-train.controller";
import { AdminCarriageController } from "./controllers/admin-carriage.controller";
import { AdminTrainService } from "./services/admin-train.service";
import { AdminCarriageService } from "./services/admin-carriage.service";
import { Train } from "./entity/train.entity";
import { Carriage } from "./entity/carriage.entity";
import { Schedule } from "./entity/schedule.entity";
import { Ticket } from "./entity/ticket.entity";
import { Seat } from "./entity/seat.entity";
import { AdminScheduleController } from "./controllers/admin-schedule.controller";
import { AdminScheduleService } from "./services/admin-schedule.service";

@Module({
    imports: [TypeOrmModule.forFeature([Station, Train, Carriage, Schedule, Ticket, Seat])],
    controllers: [AdminStationController, AdminTrainController, AdminCarriageController, AdminScheduleController],
    providers: [
        // Service
        AdminTrainService,
        AdminCarriageService,
        AdminStationService,
        AdminScheduleService,

        // Validator
        IsNameStationValidator
    ],
    exports: [AdminStationService, AdminTrainService, AdminCarriageService, AdminScheduleService]
})

export class RailwayModule { }