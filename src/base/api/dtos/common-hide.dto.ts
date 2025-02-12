import { IsEmailValidator } from "@modules/users/validators/validator";
import { ApiHideProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";


export class IdDto {
    @ApiHideProperty()
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    id: number
}

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

export class StationIdDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    stationId: number
}

export class UserStationDto extends UserIdDto {
    @ApiHideProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    stationId: number
}

export class RoleDto {
    @ApiHideProperty()
    @IsString()
    @IsOptional()
    role?: string;
}