/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpStatus, HttpCode, Post, Put, Param, HttpException, Body } from '@nestjs/common';
import { AlbumService } from './album.services';
import { Album, ChangeAlbumDTO, CreateAlbumDTO } from 'src/utils/DB/entities/DBAlbum';
import { validate } from 'uuid';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) { }


    @HttpCode(HttpStatus.OK)
    @Get()
    async getAll(): Promise<Album[]> {
        return await this.albumService.getAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Album> {
        if (!validate(id)) throw new HttpException('album id not validate', HttpStatus.BAD_REQUEST);

        const album = await this.albumService.getById(id);
        if (!album) throw new HttpException('album id not found', HttpStatus.NOT_FOUND);

        return album;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() body: CreateAlbumDTO): Promise<Album> {
        if ((!body.name || !body.year) && (typeof body.name !== 'string' || typeof body.year !== 'number'))
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);
        const album = await this.albumService.create(body);
        return album;
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: ChangeAlbumDTO): Promise<Album> {

        if (!validate(id)) {
            throw new HttpException('album id not validate', HttpStatus.BAD_REQUEST);
        }

        if (typeof body.name !== 'string' || typeof body.year !== 'number')
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);

        const album = await this.albumService.getById(id);
        if (!album) throw new HttpException('album id not found', HttpStatus.NOT_FOUND);

        const updateAlbum = await this.albumService.update(album.id, body);
        return updateAlbum;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Album> {
        if (!validate(id)) throw new HttpException('album id not validate', HttpStatus.BAD_REQUEST);
        const album = await this.albumService.getById(id);
        if (!album) throw new HttpException('album id not found', HttpStatus.NOT_FOUND);

        const deleteAlbum = await this.albumService.delete(album.id);
        return deleteAlbum;
    }


}
