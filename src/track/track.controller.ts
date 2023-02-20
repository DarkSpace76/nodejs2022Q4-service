/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, HttpCode, Param, HttpException, HttpStatus, Body } from '@nestjs/common';
import { TrackService } from './track.services';
import { ChangeTrackDTO, CreateTrackDTO } from 'src/utils/DB/entities/DBTrack';
import { validate } from 'uuid';
import { Track } from 'src/utils/typeorm/entity/Track';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService) { }

    @HttpCode(HttpStatus.OK)
    @Get()
    async getAll(): Promise<Track[]> {
        return await this.trackService.getAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Track> {
        if (!validate(id)) throw new HttpException('track id not validate', HttpStatus.BAD_REQUEST);

        const track = await this.trackService.getById(id);
        if (!track) throw new HttpException('track id not found', HttpStatus.NOT_FOUND);

        return track;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() body: CreateTrackDTO): Promise<Track> {
        if (!body.duration || !body.name)
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);
        const track = await this.trackService.create(body);
        return track;
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: ChangeTrackDTO): Promise<Track> {
        if (!body.duration || !body.name)
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);

        if (!validate(id)) throw new HttpException('track id not validate', HttpStatus.BAD_REQUEST);

        const track = await this.trackService.getById(id);
        if (!track) throw new HttpException('track id not found', HttpStatus.NOT_FOUND);

        const updateTrack = await this.trackService.update(track.id, body);
        return updateTrack;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Track> {
        if (!validate(id)) throw new HttpException('track id not validate', HttpStatus.BAD_REQUEST);
        const track = await this.trackService.getById(id);
        if (!track) throw new HttpException('track id not found', HttpStatus.NOT_FOUND);

        const deleteUser = await this.trackService.delete(track.id);
        return deleteUser;
    }

}
