import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedule } from "../entity/schedule.entity";
import { Repository } from "typeorm";
import { ScheduleStatus } from "../enums/schedule.enum";

@Injectable()
export class AdminScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>
  ) {}

  async getListSchedule(
    status: ScheduleStatus,
    pageSize = 10,
    currentPage = 1
  ) {
    const queryBuilder =
      this.scheduleRepository.createQueryBuilder("schedules");

    if (status) {
      queryBuilder.where("schedules.status = :status", { status });
    }
    const skip = (currentPage - 1) * pageSize;
    const schedules = queryBuilder.skip(skip).take(pageSize).getMany();

    return { data: schedules };
  }
}
