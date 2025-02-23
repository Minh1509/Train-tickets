import { Controller, Get } from "@nestjs/common";
import { UserStationService } from "../services/user-station.service";
import { ResponseMessage } from "@base/api/decorators";
import { Public } from "@modules/auth/jwt";
import { ApiTags } from "@nestjs/swagger";

@Public()
@Controller("user/stations")
@ApiTags("User/ Station/ Railway")
export class UserStationController {
  constructor(private readonly userStationService: UserStationService) {}

  @Get("")
  @ResponseMessage("Get list stations")
  async getListStations() {
    return await this.userStationService.getListStations();
  }
}
