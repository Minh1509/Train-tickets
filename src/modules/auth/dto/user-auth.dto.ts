import { IsEmailValidator, IsPhoneNumberValidator } from "@modules/users/validators/validator";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { EnumMethodForgotPassword } from "../enums";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UsernameDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    username: string
}

export class LoginAuthDto extends UsernameDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string
}

export class ForgotPasswordDto extends UsernameDto {

    @ApiProperty({ enum: EnumMethodForgotPassword, default: EnumMethodForgotPassword.SMS })
    @IsString()
    @IsNotEmpty()
    @IsEnum(EnumMethodForgotPassword)
    method: string

}

export class VerifyOtpDto extends UsernameDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    otp: number

}

export class ResetPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPassword: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    repeatPassword: string
}