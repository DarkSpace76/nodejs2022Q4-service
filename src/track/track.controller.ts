/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, HttpCode, Param, HttpStatus, Body, UseGuards } from '@nestjs/common';
import { TrackService } from './track.services';
import { ChangeTrackDTO, CreateTrackDTO } from 'src/utils/DB/entities/DBTrack';
import { validate } from 'uuid';
import { Track } from 'src/utils/typeorm/entity/Track';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { MyHttpException } from 'src/loger/my.http.exception';
import { MyLogger } from 'src/loger/my.loger.service';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService, private myLogger: MyLogger) { }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async getAll(): Promise<Track[]> {
        this.myLogger.log(`get all tracks status code: ${HttpStatus.OK}`);
        return await this.trackService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Track> {
        if (!validate(id)) throw new MyHttpException('track id not validate', HttpStatus.BAD_REQUEST, this.myLogger);

        const track = await this.trackService.getById(id);
        if (!track) throw new MyHttpException('track id not found', HttpStatus.NOT_FOUND, this.myLogger);

        this.myLogger.log(`get by id track status code: ${HttpStatus.OK}`);
        return track;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() body: CreateTrackDTO): Promise<Track> {
        if (!body.duration || !body.name)
            throw new MyHttpException('body does not contain required fields', HttpStatus.BAD_REQUEST, this.myLogger);
        const track = await this.trackService.create(body);

        this.myLogger.log(`created track status code: ${HttpStatus.CREATED}`);
        return track;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: ChangeTrackDTO): Promise<Track> {
        if (!body.duration || !body.name)
            throw new MyHttpException('body does not contain required fields', HttpStatus.BAD_REQUEST, this.myLogger);

        if (!validate(id)) throw new MyHttpException('track id not validate', HttpStatus.BAD_REQUEST, this.myLogger);

        const track = await this.trackService.getById(id);
        if (!track) throw new MyHttpException('track id not found', HttpStatus.NOT_FOUND, this.myLogger);

        const updateTrack = await this.trackService.update(track.id, body);

        this.myLogger.log(`update track status code: ${HttpStatus.OK}`);
        return updateTrack;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Track> {
        if (!validate(id)) throw new MyHttpException('track id not validate', HttpStatus.BAD_REQUEST, this.myLogger);
        const track = await this.trackService.getById(id);
        if (!track) throw new MyHttpException('track id not found', HttpStatus.NOT_FOUND, this.myLogger);

        const deleteUser = await this.trackService.delete(track.id);

        this.myLogger.log(`delete track status code: ${HttpStatus.NO_CONTENT}`);
        return deleteUser;
    }

}
