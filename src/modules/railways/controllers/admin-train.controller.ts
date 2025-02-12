import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from "@nestjs/common";
import { AdminTrainService } from "../services/admin-train.service";
import { AddUserToBody, ResponseMessage } from "@base/api/decorators";
import { CreateTrainDto, UpdateTrainDto } from "../dto/admin-train.dto";

@Controller("trains")
export class AdminTrainController {
    constructor(private readonly trainService: AdminTrainService) { }

    @Post("")
    @ResponseMessage("Create train success")
    @HttpCode(HttpStatus.CREATED)
    async createTrain(
        @AddUserToBody({ paramSource: 'userId' })
        @Body() dto: CreateTrainDto) {
        console.log(dto)
        return await this.trainService.createTrain(dto)
    }

    @Patch(":trainId")
    @ResponseMessage("Update train success")
    @HttpCode(HttpStatus.OK)
    async updateTrain(@Body() dto: UpdateTrainDto) {

    }
}