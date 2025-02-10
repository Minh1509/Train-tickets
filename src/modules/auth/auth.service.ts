import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from '@config';
import { IAccount, IUser } from '@modules/users/interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/users/entity/user.entity';
import { Repository } from 'typeorm';
import *  as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { SmsService } from '@providers/sms/sms.service';
import { ForgotPasswordDto, LoginAuthDto, ResetPasswordDto, UsernameDto, VerifyOtpDto } from './dto';
import { EnumMethodForgotPassword } from './enums';
import { MailService } from '@providers/mail/mail.service';
import { OtpService } from '@base/otp/otp.service';
import { IUpdatedBy } from '@base/api/interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly smsService: SmsService,
        private readonly mailService: MailService,
        private readonly otpService: OtpService,
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
        const user = await this.userRepository.findOne({
            where: {
                username: username,

            }
        });
        if (!user) throw new BadRequestException("Username not found");

        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) throw new BadRequestException("Password is valid");

        const payload: IUser = {
            userId: user.id,
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

    /**
     * B1: Nhaap username, chon method
     * B2: Check username
     * B3: Tao Otp , save redis
     * B4: xet method (Email, SMS)
     * B5: send Otp
     */
    public async forgotPassword(dto: ForgotPasswordDto) {
        const { method, username } = dto;
        const foundUser = await this.userRepository.findOne({
            where: {
                username: username,
                isDeleted: false
            }
        });
        if (!foundUser) throw new BadRequestException("Username not found");

        const otpRandom = await this.otpService.generateAndSaveOtpRedis(username);

        if (method === EnumMethodForgotPassword.SMS) {
            const toPhone = foundUser.phone
            await this.smsService.sendOtpForgotPassword(toPhone, otpRandom);
        }
        else if (method === EnumMethodForgotPassword.EMAIL) {
            const toEmail = foundUser.email
            await this.mailService.sendMailForgotPassword(foundUser, otpRandom, toEmail);
        }
        else throw new BadRequestException("Có lỗi xảy ra")
        return true;
    }


    /**
     * 
     * @param dto 
     * @check username
     * @check otp expire in redis
     * @verify otp
     * @delete otp if eccept
     */
    public async verifyOtpForgotPassword(dto: VerifyOtpDto) {
        const { username, otp } = dto;
        const foundUser = await this.userRepository.findOne({
            where: {
                username: username,
                isDeleted: false
            }
        });
        if (!foundUser) throw new BadRequestException("Username not found")

        const checkOtp = await this.otpService.checkOtp(otp, username);
        if (!checkOtp) throw new BadRequestException("Otp not valid");
        return true;
    }


    public async resetPassword(query: UsernameDto, body: ResetPasswordDto) {
        const username = query.username
        const { newPassword, repeatPassword } = body
        const foundUser = await this.userRepository.findOne({
            where: {
                username: username,
                isDeleted: false
            }
        });
        if (!foundUser) throw new BadRequestException("Username not found");

        const matchPass = await bcrypt.compare(newPassword, foundUser.password);
        if (matchPass) throw new BadRequestException("Mật khẩu trung với mật khẩu cũ");

        if (newPassword !== repeatPassword) throw new BadRequestException("Mật khâu mới và mật khẩu lặp lại không khớp");

        const hashPass = await bcrypt.hash(newPassword, 10);
        const updateBy: IUpdatedBy = {
            userId: foundUser.id,
        }

        foundUser.password = hashPass;
        foundUser.updatedBy = updateBy
        await this.userRepository.save(foundUser);

        const userPublic: IAccount = _.pick(foundUser, ['id', 'firstName', 'lastName', 'fullName', 'dateOfBirth', 'username', 'gender', 'email', 'phone', 'location'])
        return { data: userPublic }

    }
}
