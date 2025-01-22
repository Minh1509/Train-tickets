import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthService } from "@modules/auth/auth.service";
import { IUser } from "./interface";
import { Response } from "express";
import { config } from "@config";
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly authService: AuthService) { }

    public async signup(dto: CreateUserDto, response: Response) {
        const { username, password } = dto;
        console.log(username, password)
        const user = await this.userRepository.findOne({ where: { username: username } })
        console.log(user)
        if (user) throw new BadRequestException("User exit with username or email")
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            ...dto,
            password: hashPassword,
        });
        console.log(newUser)
        if (newUser) {
            const payload: IUser = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: [newUser.role]
            }
            const { accessToken, refToken } = await this.authService.createTokenPair(payload);

            // set cookies
            const maxAge = 1000 * 60 * 60 * 24 * config.COOKIE_EXPIRED
            response.cookie('refToken', refToken, {
                httpOnly: true,
                maxAge: maxAge
            })

            await this.userRepository.save(newUser);
            return {
                data: {
                    user: newUser,
                    accessToken: accessToken
                }
            }
        }


    }
}
