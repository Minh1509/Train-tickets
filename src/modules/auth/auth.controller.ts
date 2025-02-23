import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Req, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseMessage } from '@base/api/decorators';
import { Request, Response } from 'express';
import { Public } from './jwt/jwt.decorator';
import { Roles } from '@base/authorization/role/role.decorator';
import { Role } from '@base/authorization';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ForgotPasswordDto, LoginAuthDto, ResetPasswordDto, UsernameDto, VerifyOtpDto } from './dto';

@ApiBearerAuth("Authorization")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ResponseMessage("Login successfully")
  async login(@Body() dto: LoginAuthDto, @Res({ passthrough: true }) response: Response) {
    return await this.authService.login(dto, response);
  }

  @Get("forgot-password")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage("Send OTP success")
  async forgotPassword(@Query() dto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(dto);
  }

  // @Get("verify-otp")
  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @ResponseMessage("Verify OTP success")
  // async verifyOtp(@Query() dto: VerifyOtpDto) {
  //   return await this.authService.verifyOtpForgotPassword(dto);
  // }

  @Post("reset-password")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage("Reset password success")
  async resetPassword(@Query() query: UsernameDto, @Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(query, body);
  }

  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  @ResponseMessage("Logout success")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(req, res);
  }

  @Roles(Role.STAFF)
  @Post("test")
  @HttpCode(HttpStatus.OK)
  @ResponseMessage("Test role, jwt")
  async test(@Req() req: Request) {
    return {
      data: req.user
    }
  }
}
