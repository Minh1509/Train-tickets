import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '@base/api/decorators';
import { Response } from 'express';
import { Public } from '@modules/auth/jwt';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  @ResponseMessage("Register user")
  async signup(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    return await this.usersService.signup(dto, response);
  }
}
