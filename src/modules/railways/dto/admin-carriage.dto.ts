import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from "class-validator";
import { TypeCarriage, StatusCarriage } from "../enums";
import { Type } from "class-transformer";
import { UserIdDto } from "@base/api/dtos/common-hide.dto";

export class CreateCarriageDto extends UserIdDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  trainId: number;

  @ApiProperty({ enum: TypeCarriage, default: TypeCarriage.NORMAL })
  @IsEnum(TypeCarriage)
  @IsOptional()
  carriage_type?: TypeCarriage;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  carriage_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  capacity: number;

  @ApiProperty({ enum: StatusCarriage, default: StatusCarriage.ACTIVE })
  @IsEnum(StatusCarriage)
  @IsOptional()
  status?: StatusCarriage;
}

export class UpdateCarriageDto {}
