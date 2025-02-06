import { IsEmailValidator, IsPhoneNumberValidator } from "@modules/users/validators/validator";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { EnumMethodForgotPassword } from "../enums";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEmail()
    @Validate(IsEmailValidator)
    toEmail?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Validate(IsPhoneNumberValidator)
    toPhone?: string

    @ApiProperty({ enum: EnumMethodForgotPassword, default: EnumMethodForgotPassword.SMS })
    @IsString()
    @IsNotEmpty()
    @IsEnum(EnumMethodForgotPassword)
    method: string

}