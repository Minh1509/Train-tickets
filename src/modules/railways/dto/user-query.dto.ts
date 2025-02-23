import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate
} from "class-validator";
import { IsValidNameStationValidator } from "../validators";
import { normalizeStringForDatabase } from "@base/api/helpers";

export class SearchTrainAndCarriageDto {
  @Validate(IsValidNameStationValidator)
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? normalizeStringForDatabase(value) : value))
  from: string;

  @Validate(IsValidNameStationValidator)
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? normalizeStringForDatabase(value) : value))
  to: string;

  @ApiProperty({ default: "2003-09-15" })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date_from: Date;

  @ApiProperty({ default: "2003-09-15" })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date_to: Date;
}
