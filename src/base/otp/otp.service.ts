import { config } from "@config";
import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import Redis from "ioredis";
import { randomInt } from "node:crypto";

@Injectable()
export class OtpService {

    constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) { }

    private generateRandomOtp() {
        const otpRandom = randomInt(100000, 1000000);
        return otpRandom;
    }

    public async generateAndSaveOtpRedis(username: string) {
        const otpRandom = this.generateRandomOtp();
        const checkOtp = await this.redisClient.get(`otp:${username}`);
        if (!checkOtp) {
            await this.redisClient.set(`otp:${username}`, otpRandom, 'EX', config.OTP_EXPIRE);
        }
        else {
            await this.redisClient.del(`otp:${username}`);
            await this.redisClient.set(`otp:${username}`, otpRandom, 'EX', config.OTP_EXPIRE);
        }
        return otpRandom;

    }

    public async checkOtp(otp: number, username: string) {
        const storedOtp = await this.redisClient.get(`otp:${username}`);
        if (!storedOtp || otp !== +storedOtp) throw new BadRequestException("Otp của bạn đã hết hạn hoặc không đúng")
        await this.redisClient.del(`otp:${username}`);
        return true;

    }
}