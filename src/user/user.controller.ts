/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.services';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/utils/DB/entities/DBUsers';
import { validate } from 'uuid';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @HttpCode(200)
    @Get()
    async getAllUser(): Promise<User[]> {
        return this.userService.getAllUser();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        if (!validate(id)) throw new HttpException('user id not validate', HttpStatus.BAD_REQUEST);

        const user = await this.userService.getById(id);

        if (!user) throw new HttpException('user id not found', HttpStatus.NOT_FOUND);

        return user;
    }

    @HttpCode(201)
    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<User> {
        if (!body.login || !body.password)
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);

        const user = await this.userService.createUser(body);
        return user;
    }

    @HttpCode(200)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() body: UpdatePasswordDto): Promise<User> {
        if (!body.newPassword || !body.oldPassword)
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);
        if (!validate(id)) throw new HttpException('user id not validate', HttpStatus.BAD_REQUEST);
        const user = await this.userService.getById(id);
        if (!user) throw new HttpException('user id not found', HttpStatus.NOT_FOUND);
        if (user.password !== body.oldPassword) throw new HttpException('Password mismatch', HttpStatus.FORBIDDEN);

        return await this.userService.updateUser(user.id, body);
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteUser(@Param('id') id: string,): Promise<User> {
        if (!validate(id)) throw new HttpException('user id not validate', HttpStatus.BAD_REQUEST);
        const user = await this.userService.getById(id);
        if (!user) throw new HttpException('user id not found', HttpStatus.NOT_FOUND);
        return await this.userService.deleteUser(user.id);
    }


}
