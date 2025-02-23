import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Train } from "../entity/train.entity";
import { Repository } from "typeorm";
import { SearchTrainDto } from "../dto/user-train.dto";
import { Schedule } from "../entity/schedule.entity";

@Injectable()
export class UserTrainService {
  constructor(
    @InjectRepository(Train)
    private readonly trainRepository: Repository<Train>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>
  ) {}

  // get list train with from, to, date
  async getListTrains(query: SearchTrainDto) {
    const { from, to, date } = query;

    const trainsWithSchedule: Schedule[] = await this.scheduleRepository
      .createQueryBuilder("schedule")
      .where("schedule.status = 'active'")
      .andWhere("schedule.departure_time >= :date", { date })
      .leftJoinAndSelect("schedule.departure_station_id", "station_from")
      .select("station_from.id")
      .leftJoinAndSelect("schedule.arrival_station_id", "station_to")
      .andWhere("station_from.name = :from", { from })
      .andWhere("station_to.name = :to", { to })
      .leftJoinAndSelect("schedule.train", "train")
      .select([
        "schedule",
        "station_from.id",
        "station_from.name",
        "station_to.id",
        "station_to.name",
        "train"
      ])
      .orderBy("train.code", "ASC")
      .getMany();
    return { data: trainsWithSchedule };
  }

  // get detail train with schedule
  async getDetailTrain(trainId: number) {
    const train: Train = await this.trainRepository
      .createQueryBuilder("train")
      .where("train.id = :trainId", { trainId })
      .andWhere("train.status = 'active'")
      .leftJoinAndSelect("train.schedules", "schedules")
      .getOne();
    if (!train) throw new BadRequestException("Train not found");
    return { data: train };
  }
}
