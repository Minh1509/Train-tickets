import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res
} from "@nestjs/common";
import { AdminStationService } from "../services/admin-station.service";
import {
  AddParamToBody,
  AddUserToBody,
  ResponseMessage
} from "@base/api/decorators";
import { CreateStationDto, UpdateStationDto } from "../dto/admin-station.dto";
import { Request } from "express";

@Controller("admin/stations")
export class AdminStationController {
  constructor(private readonly stationService: AdminStationService) {}

  @Post("")
  @ResponseMessage("Create station success")
  @HttpCode(HttpStatus.CREATED)
  async createStation(
    @AddUserToBody({ paramSource: "userId" })
    @Body()
    dto: CreateStationDto
  ) {
    return await this.stationService.createStation(dto);
  }

  @Patch(":stationId")
  @ResponseMessage("Update station success")
  @HttpCode(HttpStatus.OK)
  async updateStation(
    @AddUserToBody({ paramSource: "userId" })
    @AddParamToBody({ paramSource: "stationId" })
    @Body()
    dto: UpdateStationDto
  ) {
    return await this.stationService.updateStation(dto);
  }

  @Get("")
  @ResponseMessage("Get list stations success")
  @HttpCode(HttpStatus.OK)
  async getListStations() {
    return await this.stationService.getListStations();
  }

  @Delete(":stationId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ResponseMessage("Deleted station")
  async deleteStation(
    @Param("stationId", new ParseIntPipe()) stationId: number,
    @Req() req: Request
  ) {
    return await this.stationService.deleteStation(stationId, req.user.userId);
  }
}
