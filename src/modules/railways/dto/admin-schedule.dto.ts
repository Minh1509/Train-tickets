import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsNumber
} from "class-validator";
import { Type } from "class-transformer";

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  trainId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  departure_station_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  arrival_station_id: string;

  @ApiProperty({ default: "2003-09-15" })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  departure_time: Date;

  @ApiProperty({ default: "2003-09-15" })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  arrival_time: Date;
}

export class UpdateScheduleDto {}
