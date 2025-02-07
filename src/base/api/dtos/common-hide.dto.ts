import { ApiHideProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";


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