import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
