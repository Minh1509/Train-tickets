import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query
} from "@nestjs/common";
import { UserQueryService } from "../services/user-query.service";
import { ResponseMessage } from "@base/api/decorators";
import { SearchTrainAndCarriageDto } from "../dto/user-query.dto";
import { Public } from "@modules/auth/jwt";
import { ApiTags } from "@nestjs/swagger";

@Controller("user/search")
@Public()
@ApiTags("User/ Search/ Railway")
export class UserQueryController {
  constructor(private readonly userQueryService: UserQueryService) {}

  @Get("")
  @ResponseMessage("Get train by station")
  @HttpCode(HttpStatus.OK)
  async searchTrainAndCarriage(@Query() query: SearchTrainAndCarriageDto) {
    return await this.userQueryService.searchTrainAndCarriage(query);
  }

  @Get(":carriageId")
  @ResponseMessage("Get seat with carriage success")
  async searchSeatsWithCarriage(@Param("carriageId") carriageId: number) {
    return await this.userQueryService.searchSeatsWithCarriage(carriageId);
  }
}
