import { config } from "@config";
import { User } from "@modules/users/entity/user.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendMail(user: User, otpRandom: number, toEmail: string) {
        await this.mailerService.sendMail({
            to: toEmail,
            subject: "Email xác nhận lấy lại mật khẩu",
            text: 'Forgot password',
            template: 'confimation.hbs',
            context: {
                name: user.firstName,
                otpExpire: config.OTP_EXPIRE,
                otpRandom: otpRandom
            }
        })
    }
}