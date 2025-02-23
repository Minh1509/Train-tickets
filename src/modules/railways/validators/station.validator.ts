import { ArgumentMetadata, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { Station } from "../entity/station.entity";
import { Repository } from "typeorm";
import {
  normalizeStringForComparison,
  normalizeStringForDatabase
} from "@base/api/helpers";

@ValidatorConstraint({ name: "isUpdateNameStationValidator" })
@Injectable()
export class IsUpdateNameStationValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>
  ) {}

  async validate(name: string, args: ValidationArguments) {
    const normalizeNameForDatabase = normalizeStringForDatabase(name);
    const stationId = args.object["stationId"];
    const foundStation = await this.stationRepository
      .createQueryBuilder("stations")
      .where("stations.name = :name", { name: normalizeNameForDatabase })
      .andWhere("stations.id <> :stationId", { stationId }) // Mysql su dung <> thay vi !=
      .getOne();
    return !foundStation;
  }

  defaultMessage(args: ValidationArguments) {
    return `Station name '${args.value}' already exists`;
  }
}

@ValidatorConstraint({ name: "isValidNameStation" })
@Injectable()
export class IsValidNameStationValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>
  ) {}

  async validate(name: string, args: ValidationArguments) {
    const foundStation = await this.stationRepository.findOne({
      where: { name }
    });
    return !!foundStation;
  }

  defaultMessage(args: ValidationArguments) {
    return `Name station is valid`;
  }
}
