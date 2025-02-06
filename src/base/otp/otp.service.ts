import { Injectable } from "@nestjs/common";
import { randomInt } from "node:crypto";

@Injectable()
export class OtpService {
    generateRandomOtp = () => {
        const otpRandom = randomInt(100000, 1000000);
        return otpRandom;
    }

    async checkOtp(otp: number) {

    }
}