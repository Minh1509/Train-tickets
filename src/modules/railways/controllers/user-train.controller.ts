import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { UserTrainService } from "../services/user-train.service";
import { ResponseMessage } from "@base/api/decorators";
import { SearchTrainDto } from "../dto/user-train.dto";
import { Public } from "@modules/auth/jwt";
import { ApiTags } from "@nestjs/swagger";

@Public()
@Controller("user/trains")
@ApiTags("User/ Train/ Railway")
export class UserTrainController {
  constructor(private readonly userTrainService: UserTrainService) {}

  @Get("")
  @ResponseMessage("Get list trains")
  async getListTrain(@Query() query: SearchTrainDto) {
    return await this.userTrainService.getListTrains(query);
  }

  @Get(":trainId")
  @ResponseMessage("Get detail train with schedule")
  async getDetailTrain(@Param("trainId", new ParseIntPipe()) trainId: number) {
    return await this.userTrainService.getDetailTrain(trainId);
  }
}
