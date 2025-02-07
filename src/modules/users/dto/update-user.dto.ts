import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '@base/authorization';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['username'] as const)) {

    @ApiProperty({ required: false, enum: Role, default: Role.USER })
    @IsEnum(Role)
    @IsOptional()
    role: string
}
