import { IsEmailValidator } from "@modules/users/validators/validator";
import { ApiHideProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";


// Payload
export class UserIdDto {
    @ApiHideProperty()
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    userId: number
}

export class EmailDto {
    @ApiHideProperty()
    @IsString()
    @IsNotEmpty()
    email: string
}

export class UsernameDto {
    @ApiHideProperty()
    @IsString()
    @IsNotEmpty()
    username: string
}

export class RoleDto {
    @ApiHideProperty()
    @IsString()
    @IsOptional()
    role?: string;
}

// Id from Entity
export class IdDto {
    @ApiHideProperty()
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    id: number
}

export class StationIdDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    stationId: number
}

export class TrainIdDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    trainId: number
}

export class ScheduleIdDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    scheduleId: number
}

export class CarriageIdDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    carriageId: number
}

export class SeatIdDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    seatId: number
}

export class TicketIdDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    ticketId: number
}

export class BookingDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    bookingId: number
}

// id entity + id user
export class UserStationDto extends UserIdDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    stationId: number
}