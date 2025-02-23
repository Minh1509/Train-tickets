import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AdminCarriageService } from "../services/admin-carriage.service";
import { AddUserToBody, ResponseMessage } from "@base/api/decorators";
import { CreateCarriageDto } from "../dto/admin-carriage.dto";

@Controller("admin/carriages")
export class AdminCarriageController {
  constructor(private readonly carriageService: AdminCarriageService) {}

  @Post("")
  @ResponseMessage("Create carriage success")
  @HttpCode(HttpStatus.CREATED)
  async createCarriage(
    @AddUserToBody({ paramSource: "userId" })
    @Body()
    dto: CreateCarriageDto
  ) {
    return await this.carriageService.createCarriage(dto);
  }
}
