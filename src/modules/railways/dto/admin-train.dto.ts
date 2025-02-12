import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TypeTrain } from "../enums"
import { StatusEntity } from "@base/api/enums/status.enum"
import { UserIdDto } from "@base/api/dtos/common-hide.dto"

export class CreateTrainDto extends UserIdDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code: string

    @ApiProperty({ required: false, enum: TypeTrain, default: TypeTrain.NORMAL })
    @IsEnum(TypeTrain)
    @IsOptional()
    train_type?: TypeTrain

    @ApiProperty({ required: false, enum: StatusEntity, default: StatusEntity.ACTIVE })
    @IsEnum(StatusEntity)
    @IsOptional()
    status?: string
}

export class UpdateTrainDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    code?: string

    @ApiProperty({ required: false, enum: TypeTrain, default: TypeTrain.NORMAL })
    @IsEnum(TypeTrain)
    @IsOptional()
    train_type?: TypeTrain

    @ApiProperty({ required: false, enum: StatusEntity, default: StatusEntity.ACTIVE })
    @IsEnum(StatusEntity)
    @IsOptional()
    status?: string

}