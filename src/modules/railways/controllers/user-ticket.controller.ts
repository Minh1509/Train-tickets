import { Controller, Get, Query } from "@nestjs/common";
import { UserTicketService } from "@modules/railways/services/user-ticket.service";
import { ResponseMessage } from "@base/api/decorators";
import { GetTicketDto } from "@modules/railways/dto";
import { Public } from "@modules/auth/jwt";
import { ApiTags } from "@nestjs/swagger";

@Public()
@Controller("user/tickets")
@ApiTags("User/ Ticket/ Railway")
export class UserTicketController {
  constructor(private userTicketService: UserTicketService) {}

  @Get("")
  @ResponseMessage("Get tickets by trainId and stations")
  async getTickets(@Query() query: GetTicketDto) {
    return await this.userTicketService.getTickets(query);
  }
}
