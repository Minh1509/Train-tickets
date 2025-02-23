import { InjectRepository } from "@nestjs/typeorm";
import { Train } from "@modules/railways/entity/train.entity";
import { Repository } from "typeorm";
import { Ticket } from "@modules/railways/entity/ticket.entity";
import { BadRequestException } from "@nestjs/common";
import { Schedule } from "@modules/railways/entity/schedule.entity";
import { GetTicketDto } from "@modules/railways/dto";

export class UserTicketService {
  constructor(
    @InjectRepository(Train) protected trainRepository: Repository<Train>,
    @InjectRepository(Ticket) protected ticketRepository: Repository<Ticket>,
    @InjectRepository(Schedule)
    protected scheduleRepository: Repository<Schedule>
  ) {}

  // get all ticket with trainId, ga đi, ga đến
  // ticket: train, seat, carriage, schedule
  async getTickets(query: GetTicketDto) {
    const { trainId, station_from_Id, station_to_Id } = query;
    const schedule: Schedule = await this.scheduleRepository
      .createQueryBuilder("schedule")
      .leftJoinAndSelect("schedule.train", "train")
      .where("schedule.departure_station_id  = :station_from_Id", {
        station_from_Id
      })
      .andWhere("schedule.arrival_station_id = :station_to_Id", {
        station_to_Id
      })
      .andWhere("schedule.trainId = :trainId", { trainId })
      .andWhere("schedule.status = 'active'")
      .getOne();
    if (!schedule)
      throw new BadRequestException("TRAIN.NOT_FOUND.OR.SCHEDULE.NOT_FOUND");

    const tickets: Ticket[] = await this.ticketRepository
      .createQueryBuilder("ticket")
      .leftJoinAndSelect("ticket.seat", "seat")
      .leftJoinAndSelect("seat.carriage", "carriage")
      .where("ticket.scheduleId = :scheduleId", { scheduleId: schedule.id })
      .getMany();

    return {
      data: {
        schedule,
        tickets
      }
    };
  }
}
