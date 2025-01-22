import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResponseMessage } from '@base/api/decorators';
import { Response } from 'express';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ResponseMessage("Login successfully")
  async login(@Body() dto: LoginAuthDto, @Res({ passthrough: true }) response: Response) {
    return await this.authService.login(dto, response);
  }

}
