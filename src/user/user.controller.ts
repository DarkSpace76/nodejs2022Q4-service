/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.services';
import { CreateUserDto, UpdatePasswordDto, UserDto } from 'src/utils/DB/entities/DBUsers';
import { validate } from 'uuid';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { MyLogger } from 'src/loger/my.loger.service';
import { MyHttpException } from 'src/loger/my.http.exception';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private myLogger: MyLogger) {

    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(200)
    @Get()
    async getAllUser(): Promise<UserDto[]> {
        this.myLogger.log(`get all Users status code: ${HttpStatus.OK}`);
        return (await this.userService.getAll()).map(user => new UserDto(user));
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(200)
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserDto> {
        if (!validate(id)) {
            throw new MyHttpException('user id not validate', HttpStatus.BAD_REQUEST, this.myLogger);

        }

        const user = await this.userService.getById(id);
        if (!user) {
            throw new MyHttpException('user id not found', HttpStatus.NOT_FOUND, this.myLogger);
        }
        this.myLogger.log(`getByUserid status code: ${HttpStatus.OK}`);
        return new UserDto(user);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(201)
    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<UserDto> {
        if (!body.login || !body.password)
            throw new MyHttpException('body does not contain required fields', HttpStatus.BAD_REQUEST, this.myLogger);
        const user = await this.userService.create(body);

        this.myLogger.log(`created Users status code: ${HttpStatus.CREATED}`);
        return new UserDto(user);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(200)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() body: UpdatePasswordDto): Promise<UserDto> {
        if (!body.newPassword || !body.oldPassword)
            throw new MyHttpException('body does not contain required fields', HttpStatus.BAD_REQUEST, this.myLogger);
        if (!validate(id)) throw new MyHttpException('user id not validate', HttpStatus.BAD_REQUEST, this.myLogger);
        const user = await this.userService.getById(id);
        if (!user) throw new MyHttpException('user id not found', HttpStatus.NOT_FOUND, this.myLogger);

        const updateUser = await this.userService.update(user.id, body);

        this.myLogger.log(`uodate Users status code: ${HttpStatus.OK}`);
        return new UserDto(updateUser);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserDto> {
        if (!validate(id)) throw new MyHttpException('user id not validate', HttpStatus.BAD_REQUEST, this.myLogger);
        const user = await this.userService.getById(id);
        if (!user) throw new MyHttpException('user id not found', HttpStatus.NOT_FOUND, this.myLogger);

        const deleteUser = await this.userService.delete(user.id);

        this.myLogger.log(`delete Users status code: ${HttpStatus.NO_CONTENT}`);
        return new UserDto(deleteUser);
    }


}
