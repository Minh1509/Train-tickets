import { IdDto, StationIdDto, UserIdDto, UserStationDto } from "@base/api/dtos/common-hide.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, Validate } from "class-validator";
import { IsNameStationValidator } from "../validators/validator";
import { Transform } from "class-transformer";
import { normalizeStringForDatabase } from "@base/api/helpers";

export class CreateStationDto extends UserIdDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string
}

export class UpdateStationDto extends UserStationDto {
    @Validate(IsNameStationValidator)
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    @Transform(({ value }) => value ? normalizeStringForDatabase(value) : value)
    name: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    location: string
}