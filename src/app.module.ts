/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { InitMongodb } from './base/database/init.mongodb';

@Module({
  imports: [
    // globals
    ConfigModule,

    // DB
    InitMongodb,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
