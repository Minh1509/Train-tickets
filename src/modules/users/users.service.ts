import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import * as bcryptjs from 'bcryptjs'
import { AuthService } from "@modules/auth/auth.service";
import { IUser } from "./interface";
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly authService: AuthService) { }

    async signUp(dto: CreateUserDto) {
        const { username, password } = dto;
        const user = await this.userRepository.findOne({ where: { username: username } })
        if (user) throw new BadRequestException("User exit with username or email")
        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = await this.userRepository.create({
            password: hashPassword,
            ...dto
        });
        if (newUser) {
            const payload: IUser = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: [newUser.role]
            }
            const { accessToken, refToken } = await this.authService.createTokenPair(payload);
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
