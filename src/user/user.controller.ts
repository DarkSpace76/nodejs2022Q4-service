/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.services';
import { CreateUserDto, UpdatePasswordDto, UserEntity } from 'src/utils/DB/entities/DBUsers';
import { validate } from 'uuid';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(200)
    @Get()
    async getAllUser(): Promise<UserEntity[]> {
        return (await this.userService.getAll()).map(user => new UserEntity(user));
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(200)
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserEntity> {
        if (!validate(id)) throw new HttpException('user id not validate', HttpStatus.BAD_REQUEST);

        const user = await this.userService.getById(id);
        if (!user) throw new HttpException('user id not found', HttpStatus.NOT_FOUND);

        return new UserEntity(user);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(201)
    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<UserEntity> {
        if (!body.login || !body.password)
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);
        const user = await this.userService.create(body);
        return new UserEntity(user);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(200)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() body: UpdatePasswordDto): Promise<UserEntity> {
        if (!body.newPassword || !body.oldPassword)
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);
        if (!validate(id)) throw new HttpException('user id not validate', HttpStatus.BAD_REQUEST);
        const user = await this.userService.getById(id);
        if (!user) throw new HttpException('user id not found', HttpStatus.NOT_FOUND);

        const updateUser = await this.userService.update(user.id, body);
        return new UserEntity(updateUser);
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserEntity> {
        if (!validate(id)) throw new HttpException('user id not validate', HttpStatus.BAD_REQUEST);
        const user = await this.userService.getById(id);
        if (!user) throw new HttpException('user id not found', HttpStatus.NOT_FOUND);

        const deleteUser = await this.userService.delete(user.id);
        return new UserEntity(deleteUser);
    }


}
