import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '@base/api/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("")
  @ResponseMessage("Register user")
  async signUp(@Body() dto: CreateUserDto) {
    return await this.usersService.signUp(dto);
  }
}
