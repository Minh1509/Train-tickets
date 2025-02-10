import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Station } from "./entity/station.entity";
import { StationController } from "./controllers/station.controller";
import { StationService } from "./services/station.service";
import { IsNameStationValidator } from "./validators/validator";

@Module({
    imports: [TypeOrmModule.forFeature([Station])],
    controllers: [StationController],
    providers: [StationService, IsNameStationValidator],
    exports: [StationService]
})

export class RailwayModule { }