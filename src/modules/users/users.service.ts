import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthService } from "@modules/auth/auth.service";
import { IAccount, IUser } from "./interface";
import { Response } from "express";
import { config } from "@config";
import * as _ from 'lodash'
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly authService: AuthService) { }

    public async signup(dto: CreateUserDto, response: Response) {
        const { username, password } = dto;
        const user = await this.userRepository.findOne({ where: { username: username } })
        if (user) throw new BadRequestException("User exit with username")

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            ...dto,
            password: hashPassword,
        });

        if (newUser) {
            const payload: IUser = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                roles: [newUser.role]
            }
            const { accessToken, refToken } = await this.authService.createTokenPair(payload);

            // update refToken db
            newUser.refToken = refToken;

            // set cookies
            const maxAge = 1000 * 60 * 60 * 24 * config.COOKIE_EXPIRED
            response.cookie('refToken', refToken, {
                httpOnly: true,
                maxAge: maxAge
            })

            await this.userRepository.save(newUser);
            const userPublic: IAccount = _.pick(newUser, ['id', 'firstName', 'lastName', 'fullName', 'dateOfBirth', 'username', 'gender', 'email', 'phone', 'location'])
            return {
                data: {
                    user: userPublic,
                    accessToken: accessToken
                }
            }
        }


    }

    public async getMe(id: number) {
        const user: User = await this.userRepository.findOne({ where: { id: id } });

        if (!user) throw new BadRequestException("User with id not found");

        const userPublic: IAccount = _.pick(user, ['id', 'firstName', 'lastName', 'fullName', 'dateOfBirth', 'username', 'gender', 'email', 'phone', 'location'])
        return {
            data: userPublic
        }
    }
}
