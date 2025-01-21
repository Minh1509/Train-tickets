import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/login-cms-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { config } from '@config';
import { IUser } from '@modules/users/interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }
    createTokenPair = async (payload: IUser) => {
        try {
            const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '1000d' });
            const refToken = await this.jwtService.signAsync(payload, { expiresIn: '1000d' });

            return { accessToken, refToken };
        } catch (error) {
            console.error(error)
        }
    }
}
