import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '@base/api/decorators';
import { Response } from 'express';
import { Public } from '@modules/auth/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("Authorization")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  @ResponseMessage("Register user")
  async signup(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    return await this.usersService.signup(dto, response);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ResponseMessage("Get me success")
  async getMe(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.getMe(id);
  }

}
