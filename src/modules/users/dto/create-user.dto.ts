import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, Validate } from "class-validator";
import { EnumGender } from "../enums/user.enum";
import { IsEmailValidator, IsPhoneNumberValidator } from "../validators/validator";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { RoleDto } from "@base/api/dtos/common-hide.dto";

export class CreateUserDto extends RoleDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    fullName: string;

    @ApiProperty({ default: "2003-09-15" })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    dateOfBirth: Date;

    @ApiProperty({ enum: EnumGender, default: EnumGender.Other })
    @IsEnum(EnumGender)
    @IsNotEmpty()
    gender: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @Validate(IsEmailValidator)
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Validate(IsPhoneNumberValidator)
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    location: string;

}
