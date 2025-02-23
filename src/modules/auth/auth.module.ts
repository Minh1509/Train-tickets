import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/users/entity/user.entity';
import { JwtAuthGuard, JwtStrategy } from './jwt';
import { SmsModule } from '@providers/sms/sms.module';
import { MailModule } from '@providers/mail/mail.module';
// import { OtpService } from '@base/otp/otp.service';

@Module({
  imports: [
    MailModule,
    SmsModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET
    }),

  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    // OtpService,

  ],
  exports: [AuthService]
})
export class AuthModule { }
