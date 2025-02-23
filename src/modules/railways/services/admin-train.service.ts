import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Train } from "../entity/train.entity";
import { Repository } from "typeorm";
import { CreateTrainDto } from "../dto/admin-train.dto";
import { ICreatedBy } from "@base/api/interface";

@Injectable()
export class AdminTrainService {
  constructor(
    @InjectRepository(Train) private readonly trainRepository: Repository<Train>
  ) {}

  async createTrain(dto: CreateTrainDto) {
    const { code, userId } = dto;
    const foundTrain = await this.trainRepository
      .createQueryBuilder("trains")
      .where("trains.code = :code", { code })
      .andWhere("trains.status = 'active'")
      .getOne();
    if (foundTrain) throw new BadRequestException("Train not found");
    const createdBy: ICreatedBy = { userId };

    return {
      data: await this.trainRepository.save({
        ...dto,
        createdBy
      })
    };
  }
}
