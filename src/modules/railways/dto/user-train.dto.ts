import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate
} from "class-validator";
import { IsValidNameStationValidator } from "../validators";
import { Transform, Type } from "class-transformer";
import { normalizeStringForDatabase } from "@base/api/helpers";

export class SearchTrainDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? normalizeStringForDatabase(value) : value))
  @Validate(IsValidNameStationValidator)
  from: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? normalizeStringForDatabase(value) : value))
  @Validate(IsValidNameStationValidator)
  to: string;

  @ApiProperty({ default: "2003-09-15" })
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;
}
