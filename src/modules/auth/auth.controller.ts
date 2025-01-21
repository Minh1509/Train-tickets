import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/login-cms-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


}
