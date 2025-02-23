import { InjectRepository } from "@nestjs/typeorm";
import { Station } from "../entity/station.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserStationService {
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>
  ) {}

  async getListStations() {
    const stations: Station[] = await this.stationRepository
      .createQueryBuilder("station")
      .where("station.status = 'active'")
      .getMany();
    return { data: stations };
  }
}
