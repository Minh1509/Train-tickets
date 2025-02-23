import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Station } from "./entity/station.entity";
import { AdminStationController } from "./controllers/admin-station.controller";
import { AdminStationService } from "./services/admin-station.service";
import {
  IsUpdateNameStationValidator,
  IsValidNameStationValidator
} from "./validators/station.validator";
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
import { UserQueryController } from "./controllers/user-query.controller";
import { UserQueryService } from "./services/user-query.service";
import { UserStationController } from "./controllers/user-station.controller";
import { UserStationService } from "./services/user-station.service";
import { UserTrainController } from "./controllers/user-train.controller";
import { UserTrainService } from "./services/user-train.service";
import { UserTicketController } from "@modules/railways/controllers/user-ticket.controller";
import { UserTicketService } from "@modules/railways/services/user-ticket.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Station, Train, Carriage, Schedule, Ticket, Seat])
  ],
  controllers: [
    AdminStationController,
    AdminTrainController,
    AdminCarriageController,
    AdminScheduleController,
    UserQueryController,
    UserStationController,
    UserTrainController,
    UserTicketController
  ],
  providers: [
    // Service
    AdminTrainService,
    AdminCarriageService,
    AdminStationService,
    AdminScheduleService,
    UserQueryService,
    UserStationService,
    UserTrainService,
    UserTicketService,

    // Validator
    IsUpdateNameStationValidator,
    IsValidNameStationValidator
  ],
  exports: [
    AdminStationService,
    AdminTrainService,
    AdminCarriageService,
    AdminScheduleService,
    UserQueryService,
    UserStationService,
    UserTrainService,
    UserTicketService
  ]
})
export class RailwayModule {}
