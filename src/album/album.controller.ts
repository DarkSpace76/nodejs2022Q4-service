/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpStatus, HttpCode, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AlbumService } from './album.services';
import { ChangeAlbumDTO, CreateAlbumDTO } from 'src/utils/DB/entities/DBAlbum';
import { validate } from 'uuid';
import { Album } from 'src/utils/typeorm/entity/Album';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { MyBadRequestException } from 'src/loger/bad.request.except';
import { MyLogger } from 'src/loger/my.loger.service';
import { MyHttpException } from 'src/loger/my.http.exception';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService, private myLogger: MyLogger) { }


    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async getAll(): Promise<Album[]> {
        this.myLogger.log(`get all album status code: ${HttpStatus.OK}`);
        return await this.albumService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Album> {
        if (!validate(id)) throw new MyBadRequestException('album id not validate', this.myLogger);

        const album = await this.albumService.getById(id);
        if (!album) throw new MyHttpException('album id not found', HttpStatus.NOT_FOUND, this.myLogger);

        this.myLogger.log(`get by id album status code: ${HttpStatus.OK}`);
        return album;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() body: CreateAlbumDTO): Promise<Album> {
        if ((!body.name || !body.year) && (typeof body.name !== 'string' || typeof body.year !== 'number'))
            throw new MyBadRequestException('body does not contain required fields', this.myLogger);
        const album = await this.albumService.create(body);

        this.myLogger.log(`create album status code: ${HttpStatus.CREATED}`);
        return album;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: ChangeAlbumDTO): Promise<Album> {

        if (!validate(id)) {
            throw new MyBadRequestException('album id not validate', this.myLogger);
        }

        if (typeof body.name !== 'string' || typeof body.year !== 'number')
            throw new MyBadRequestException('body does not contain required fields', this.myLogger);

        const album = await this.albumService.getById(id);
        if (!album) throw new MyHttpException('album id not found', HttpStatus.NOT_FOUND, this.myLogger);

        const updateAlbum = await this.albumService.update(album.id, body);

        this.myLogger.log(`update album status code: ${HttpStatus.OK}`);
        return updateAlbum;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Album> {
        if (!validate(id)) throw new MyBadRequestException('album id not validate', this.myLogger);
        const album = await this.albumService.getById(id);
        if (!album) throw new MyHttpException('album id not found', HttpStatus.NOT_FOUND, this.myLogger);

        const deleteAlbum = await this.albumService.delete(album.id);

        this.myLogger.log(`delete album status code: ${HttpStatus.NO_CONTENT}`);
        return deleteAlbum;
    }


}
