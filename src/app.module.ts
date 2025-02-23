/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config';
import { InitMysql, InitRedis } from '@base/database';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@base/api/exceptions';
import { JwtAuthGuard } from '@modules/auth/jwt/jwt-auth.guard';
import { RolesGuard } from '@base/authorization/role/role.guard';
import { SmsModule } from '@providers/sms/sms.module';
import { MailModule } from '@providers/mail/mail.module';
import { RailwayModule } from '@modules/railways/railway.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    // globals
    ConfigModule,

    // DB
    // InitMongodb,
    InitMysql,
    // InitRedis,

    // Base module
    // OtpModule,

    // Module
    AuthModule,
    UsersModule,
    RailwayModule,

    // Provides
    MailModule,
    SmsModule,

    //Shared
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      guard: { mount: true }
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }

  ],
})
export class AppModule { }
