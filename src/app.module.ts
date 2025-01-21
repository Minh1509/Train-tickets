/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';


import { ConfigModule } from '@/config';
import { InitMysql } from '@base/database';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@base/api/exceptions';
import { CustomResponseInterceptor } from '@base/api/response/custom.response';

@Module({
  imports: [
    // globals
    ConfigModule,

    // DB
    // InitMongodb,
    InitMysql,

    // Module
    AuthModule,
    UsersModule,

    // Provides
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomResponseInterceptor,
    },
  ],
})
export class AppModule { }
