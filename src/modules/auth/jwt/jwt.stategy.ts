import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { IUser } from '@modules/users/interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/users/entity/user.entity';
import { Repository } from 'typeorm';
import { config } from '@config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.JWT_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: IUser) {
        const { id, username, roles } = payload;
        if (!id || !roles || !username) {
            throw new UnauthorizedException('UserId or role is missing in the token');
        }

        const foundUser = await this.userRepository.findOne({ where: { username: username } });
        if (!foundUser) {
            throw new UnauthorizedException('User not found');
        }

        const user: IUser = payload;
        return user;
    }

}