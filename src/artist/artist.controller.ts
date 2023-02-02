/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpStatus, HttpCode, Post, Put, Param, HttpException, Body } from '@nestjs/common';
import { Artist, ArtistService } from './artist.services';
import { validate } from 'uuid';
import { ChangeArtistDTO, CreateArtistDTO } from 'src/utils/DB/entities/DBArtist';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) { }


    @HttpCode(HttpStatus.OK)
    @Get()
    async getAll(): Promise<Artist[]> {
        return await this.artistService.getAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Artist> {
        if (!validate(id)) throw new HttpException('artist id not validate', HttpStatus.BAD_REQUEST);

        const track = await this.artistService.getById(id);
        if (!track) throw new HttpException('artist id not found', HttpStatus.NOT_FOUND);

        return track;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() body: CreateArtistDTO): Promise<Artist> {
        if ((!body.name || !body.grammy) && (typeof body.grammy !== 'boolean' || typeof body.name !== 'string'))
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);
        const artist = await this.artistService.create(body);
        return artist;
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: ChangeArtistDTO): Promise<Artist> {

        if (!validate(id)) {
            console.log(400);
            throw new HttpException('artist id not validate', HttpStatus.BAD_REQUEST);
        }
        console.log(`
        name exist ${body.name},
        grammy exi ${body.grammy},
        type name ${typeof body.name},
        type gram ${typeof body.grammy}
        `);

        if ((typeof body.grammy !== 'boolean' && typeof body.name !== 'string')) {
            console.log(400);
            throw new HttpException('body does not contain required fields', HttpStatus.BAD_REQUEST);
        }

        const artist = await this.artistService.getById(id);
        if (!artist) throw new HttpException('artist id not found', HttpStatus.NOT_FOUND);

        const updateArtist = await this.artistService.update(artist.id, body);
        return updateArtist;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Artist> {
        if (!validate(id)) throw new HttpException('artist id not validate', HttpStatus.BAD_REQUEST);
        const artist = await this.artistService.getById(id);
        if (!artist) throw new HttpException('artist id not found', HttpStatus.NOT_FOUND);

        const deleteArtist = await this.artistService.delete(artist.id);
        return deleteArtist;
    }

}