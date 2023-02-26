/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.services';
import { CreateUserDto } from 'src/utils/DB/entities/DBUsers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }


    async signUp(createUserDto: CreateUserDto): Promise<any> {
        // Check if user exists
        const userExists = await this.usersService.getByName(
            createUserDto.login,
        );
        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const newUser = await this.usersService.create(createUserDto);
        return newUser;
    }

    async login(user: any) {
        const tokens = await this.getTokens(user.id, user.login);
        return tokens;
    }

    async refresh(user: any) {
        const tokens = await this.getTokens(user.id, user.login);
        return tokens;
    }


    private async getTokens(userId: string, login: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    login: login,
                },
                {
                    secret: process.env.JWT_SECRET_KEY,
                    expiresIn: '15h',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    login: login,
                },
                {
                    secret: process.env.JWT_SECRET_REFRESH_KEY,
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}