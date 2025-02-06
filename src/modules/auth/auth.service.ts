import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from '@config';
import { IAccount, IUser } from '@modules/users/interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/users/entity/user.entity';
import { Repository } from 'typeorm';
import *  as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { SmsService } from '@providers/sms/sms.service';
import { ForgotPasswordDto } from './dto';
import { EnumMethodForgotPassword } from './enums';
import { randomInt } from 'crypto'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly smsService: SmsService,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }
    public createTokenPair = async (payload: IUser) => {
        try {
            const accessToken = await this.jwtService.signAsync(payload, { expiresIn: config.AC_TOKEN_EXPIRED });
            const refToken = await this.jwtService.signAsync(payload, { expiresIn: config.REF_TOKEN_EXPIRED });

            return { accessToken, refToken };
        } catch (error) {
            console.error(error)
        }
    }

    public async login(dto: LoginAuthDto, response: Response) {
        const { username, password } = dto;
        const user = await this.userRepository.findOne({ where: { username: username } });
        if (!user) throw new BadRequestException("Username not found");

        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) throw new BadRequestException("Password is valid");

        const payload: IUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: [user.role],
        }
        const { accessToken, refToken } = await this.createTokenPair(payload);

        // update refToken db with user
        await this.userRepository.update({ username }, { refToken: refToken })

        // set cookies
        const maxAge = 1000 * 60 * 60 * 24 * config.COOKIE_EXPIRED;
        response.cookie('refToken', refToken, {
            httpOnly: true,
            maxAge: maxAge
        });

        const userPublic: IAccount = _.pick(user, ['id', 'firstName', 'lastName', 'fullName', 'dateOfBirth', 'username', 'gender', 'email', 'phone', 'location'])
        return {
            data: {
                user: userPublic,
                accessToken: accessToken
            }
        }

    }

    public async logout(req: Request, res: Response) {
        const { username } = req.user;
        if (!username) throw new BadRequestException("Token null hoac het han");

        const user = await this.userRepository.findOne({ where: { username: username } });
        if (!user) throw new BadRequestException("User not found for logout");

        // xoa refToken
        await this.userRepository.update({ username }, { refToken: null });

        // xoa Cookie
        res.clearCookie('refToken', { httpOnly: true, secure: true, sameSite: 'strict' });

        return true;

    }

    public async forgotPassword(dto: ForgotPasswordDto) {
        const { toEmail, toPhone, method } = dto;
        if (!toEmail && !toPhone) throw new BadRequestException("Email và phone không được cùng trống")

        const otpRandom = randomInt(100000, 1000000);
        if (method === EnumMethodForgotPassword.SMS) {
            await this.smsService.sendOtp(toPhone, otpRandom);
        }
        else if (method === EnumMethodForgotPassword.EMAIL) {
            console.log("Send email with OTP :: " + otpRandom);
        }
        return true;
    }
}
