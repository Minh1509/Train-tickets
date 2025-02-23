import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Station } from "../entity/station.entity";
import { Repository } from "typeorm";
import { SearchTrainAndCarriageDto } from "../dto/user-query.dto";
import { Schedule } from "../entity/schedule.entity";
import { normalizeStringForDatabase } from "@base/api/helpers";
import { BaseGetList } from "@base/api/services/base-get-list.service";
import { Train } from "../entity/train.entity";
import { Carriage } from "../entity/carriage.entity";
import { Seat } from "../entity/seat.entity";
import { StatusCarriage } from "../enums";
import { convertToMySQLTimestamp } from "@base/api/helpers/tranform-date";

@Injectable()
export class UserQueryService extends BaseGetList<Schedule> {
  private readonly logger = new Logger(UserQueryService.name);

  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Train)
    private readonly trainRepository: Repository<Train>,
    @InjectRepository(Carriage)
    private readonly carriageRepository: Repository<Carriage>,
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>
  ) {
    super(scheduleRepository);
  }

  async searchTrainAndCarriage(query: SearchTrainAndCarriageDto) {
    const { from, to, date_from, date_to } = query;

    const schedules: Schedule[] = await this.scheduleRepository
      .createQueryBuilder("schedule")
      .where("schedule.status = 'active'")
      .andWhere("schedule.departure_time >= :date_from", { date_from })
      .andWhere("schedule.arrival_time <= :date_to", { date_to })
      .leftJoinAndSelect("schedule.departure_station_id", "departure_from")
      .leftJoinAndSelect("schedule.arrival_station_id", "departure_to")
      .andWhere("departure_from.name = :from", { from })
      .andWhere("departure_to.name = :to", { to })
      .leftJoinAndSelect("schedule.train", "train")
      .orderBy("train.code", "ASC")
      .getMany();

    const scheduleWithDetails = await Promise.all(
      schedules.map(async (schedule: Schedule) => {
        const carriages: Carriage[] = await this.carriageRepository
          .createQueryBuilder("carriage")
          .where("carriage.trainId = :id", { id: schedule.train.id })
          .andWhere("carriage.status = 'active'")
          .orderBy("carriage_number", "ASC")
          .getMany();

        // select seats with carriages[0]
        const seats: Seat[] = await this.seatRepository
          .createQueryBuilder("seat")
          .where("seat.carriageId = :carriageId", {
            carriageId: carriages[0].id
          })
          .orderBy("seat_number", "ASC")
          .getMany();

        // Caculate toatal seats, available seat
        let totalSeatsInTrain = 0;
        let availableSeatsInTrain = 0;
        const carriageWithSeats = await Promise.all(
          carriages.map(async (carriage) => {
            const totalSeats = await this.seatRepository
              .createQueryBuilder("seat")
              .where("seat.carriageId = :carriageId", {
                carriageId: carriage.id
              })
              .getCount();
            totalSeatsInTrain += totalSeats;

            const availableSeats = await this.seatRepository
              .createQueryBuilder("seat")
              .where("seat.carriageId = :carriageId", {
                carriageId: carriage.id
              })
              .andWhere("seat.is_available is TRUE")
              .getCount();

            availableSeatsInTrain += availableSeats;
            return {
              ...carriage,
              totalSeats,
              availableSeats
            };
          })
        );
        return {
          ...schedule,
          carriages: carriageWithSeats,
          seats,
          totalSeatsInTrain,
          availableSeatsInTrain
        };
      })
    );
    return { data: scheduleWithDetails };
  }

  async searchSeatsWithCarriage(carriageId: number) {
    // check carriage
    const carriage: Carriage = await this.carriageRepository
      .createQueryBuilder("carriage")
      .where("carriage.id = :carriageId", { carriageId })
      .andWhere("carriage.status = 'active'")
      .getOne();
    if (!carriage) throw new BadRequestException("Carriage not found");
    const seats: Seat[] = await this.seatRepository
      .createQueryBuilder("seat")
      .where("seat.carriageId = :carriageId", { carriageId })
      .getMany();

    return { data: seats };
  }
}
