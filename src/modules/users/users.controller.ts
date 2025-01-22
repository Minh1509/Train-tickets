import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '@base/api/decorators';
import { Response } from 'express';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  @ResponseMessage("Register user")
  async signup(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    return await this.usersService.signup(dto, response);
  }
}
