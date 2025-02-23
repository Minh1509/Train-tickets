import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Carriage } from "../entity/carriage.entity";
import { Repository } from "typeorm";
import { CreateCarriageDto } from "../dto/admin-carriage.dto";
import { Train } from "../entity/train.entity";
import { ICreatedBy } from "@base/api/interface";

@Injectable()
export class AdminCarriageService {
  constructor(
    @InjectRepository(Carriage)
    private readonly carriageRepository: Repository<Carriage>,
    @InjectRepository(Train) private readonly trainRepository: Repository<Train>
  ) {}

  async createCarriage(dto: CreateCarriageDto) {
    const { userId, trainId, carriage_number } = dto;
    const foundTrain: Train = await this.trainRepository.findOne({
      where: { id: trainId }
    });
    if (!foundTrain) throw new BadRequestException("Train not found");

    const existsCarriage = await this.carriageRepository.exists({
      where: { train: { id: trainId }, carriage_number }
    });
    if (existsCarriage)
      throw new BadRequestException("Carriage này đã tồn tại trên tàu");

    const createdBy: ICreatedBy = { userId };
    const newCarriage = this.carriageRepository.create({
      ...dto,
      createdBy: createdBy,
      train: foundTrain
    });

    return { data: await this.carriageRepository.save(newCarriage) };
  }
}
