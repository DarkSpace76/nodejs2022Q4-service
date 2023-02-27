/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpStatus, HttpCode, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { Artist, ArtistService } from './artist.services';
import { validate } from 'uuid';
import { ChangeArtistDTO, CreateArtistDTO } from 'src/utils/DB/entities/DBArtist';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { MyHttpException } from 'src/loger/my.http.exception';
import { MyLogger } from 'src/loger/my.loger.service';
import { MyBadRequestException } from 'src/loger/bad.request.except';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService, private myLogger: MyLogger) { }


    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async getAll(): Promise<Artist[]> {
        this.myLogger.log(`get all artists status code: ${HttpStatus.OK}`);
        return await this.artistService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Artist> {
        if (!validate(id)) throw new MyBadRequestException('artist id not validate', this.myLogger);

        const track = await this.artistService.getById(id);
        if (!track) throw new MyHttpException('artist id not found', HttpStatus.NOT_FOUND, this.myLogger);

        this.myLogger.log(`get by id artist status code: ${HttpStatus.OK}`);
        return track;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() body: CreateArtistDTO): Promise<Artist> {
        if ((!body.name || !body.grammy) && (typeof body.grammy !== 'boolean' || typeof body.name !== 'string'))
            throw new MyBadRequestException('body does not contain required fields', this.myLogger);
        const artist = await this.artistService.create(body);

        this.myLogger.log(`created artist status code: ${HttpStatus.CREATED}`);
        return artist;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: ChangeArtistDTO): Promise<Artist> {

        if (!validate(id)) {
            throw new MyBadRequestException('artist id not validate', this.myLogger);
        }

        if ((typeof body.grammy !== 'boolean' && typeof body.name !== 'string')) {
            throw new MyBadRequestException('body does not contain required fields', this.myLogger);
        }

        const artist = await this.artistService.getById(id);
        if (!artist) throw new MyHttpException('artist id not found', HttpStatus.NOT_FOUND, this.myLogger);

        const updateArtist = await this.artistService.update(artist.id, body);

        this.myLogger.log(`update artist status code: ${HttpStatus.OK}`);
        return updateArtist;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Artist> {
        if (!validate(id)) throw new MyBadRequestException('artist id not validate', this.myLogger);
        const artist = await this.artistService.getById(id);
        if (!artist) throw new MyHttpException('artist id not found', HttpStatus.NOT_FOUND, this.myLogger);

        const deleteArtist = await this.artistService.delete(artist.id);

        this.myLogger.log(`delete artist status code: ${HttpStatus.NO_CONTENT}`);
        return deleteArtist;
    }

}
