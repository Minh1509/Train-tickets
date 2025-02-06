import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResponseMessage } from '@base/api/decorators';
import { Request, Response } from 'express';
import { Public } from './jwt/jwt.decorator';
import { Roles } from '@base/authorization/role/role.decorator';
import { Role } from '@base/authorization';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto';

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

  @Post("forgot-password")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage("Send OTP success")
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(dto);
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
