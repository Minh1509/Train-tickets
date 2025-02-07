import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, ParseIntPipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '@base/api/decorators';
import { Request, Response } from 'express';
import { Public } from '@modules/auth/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from '@base/authorization';

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

  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ResponseMessage("Get me success")
  async getMe(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.getMe(id);
  }

  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @Get("")
  @HttpCode(HttpStatus.OK)
  @ResponseMessage("Get list user")
  async getListUser() {
    return await this.usersService.getListUser();
  }

  @Roles(Role.ADMIN, Role.STAFF, Role.USER)
  @Patch(":id")
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage("Update user success")
  async updateUser(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateUserDto, @Req() req: Request) {
    return await this.usersService.updateUser(dto, id, req);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Delete(":id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ResponseMessage("Delete user success")
  async deleteUser(@Param('id', new ParseIntPipe()) id: number, @Req() req: Request) {
    console.log(id, req.user)
    return await this.usersService.deleteUser(id, req);
  }

}
