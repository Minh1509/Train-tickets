import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResponseMessage } from '@base/api/decorators';
import { Request, Response } from 'express';
import { Public } from './jwt/jwt.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@base/authorization/role/role.decorator';
import { Role } from '@base/authorization';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ResponseMessage("Login successfully")
  async login(@Body() dto: LoginAuthDto, @Res({ passthrough: true }) response: Response) {
    return await this.authService.login(dto, response);
  }

  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  @ResponseMessage("Logout success")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(req, res);
  }

  @Roles(Role.STAFF, Role.USER)
  @Post("test")
  @HttpCode(HttpStatus.OK)
  @ResponseMessage("Test role, jwt")
  async test(@Req() req: Request) {
    return {
      data: req.user
    }
  }

}
