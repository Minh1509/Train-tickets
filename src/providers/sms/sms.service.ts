import { config } from "@config";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as twilio from 'twilio'

@Injectable()
export class SmsService {
    private client: twilio.Twilio = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

    async sendOtp(toPhone: string, otp: number) {
        const sendMessage = await this.client.messages.create({
            body: `Mã xác nhận của bạn sẽ có hiệu lực trong 2 phút: ${otp}`,
            from: config.TWILIO_FROM,
            to: config.TWILIO_TO
        })
        if (!sendMessage) throw new BadRequestException("Send message failed")
    }
}