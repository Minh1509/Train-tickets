import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from '@config';
import { IUser } from '@modules/users/interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/users/entity/user.entity';
import { Repository } from 'typeorm';
import *  as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }
    public createTokenPair = async (payload: IUser) => {
        try {
            const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '1000d' });
            const refToken = await this.jwtService.signAsync(payload, { expiresIn: '1000d' });

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
            role: [user.role],
        }
        const { accessToken, refToken } = await this.createTokenPair(payload);

        // set cookies
        const maxAge = 1000 * 60 * 60 * 24 * config.COOKIE_EXPIRED;
        response.cookie('refToken', refToken, {
            httpOnly: true,
            maxAge: maxAge
        });

        return {
            data: {
                user: user,
                accessToken: accessToken
            }
        }

    }
}
