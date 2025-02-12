import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from "class-validator";
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

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    departure_time: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    arrival_time: Date;
}

export class UpdateScheduleDto { }