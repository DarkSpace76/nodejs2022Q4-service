/* eslint-disable prettier/prettier */
import { Controller, HttpCode, HttpStatus, Param, Post, Delete, Get, HttpException } from '@nestjs/common';
import { FavoritesService } from './favorites.services';
import { ResponseFavorites } from 'src/utils/DB/entities/DBFavorites';


@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoriteService: FavoritesService) { }

    @HttpCode(HttpStatus.OK)
    @Get()
    async getAll(): Promise<ResponseFavorites> {
        return await this.favoriteService.getAll();
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('track/:id')
    async addTrack(@Param('id') id: string): Promise<void> {
        const fHelper = await this.favoriteService.addTrack(id);
        if (fHelper) throw new HttpException(fHelper.message, fHelper.code);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('track/:id')
    async deleteTrack(@Param('id') id: string): Promise<void> {
        const fHelper = await this.favoriteService.deleteTrack(id);
        if (fHelper) throw new HttpException(fHelper.message, fHelper.code);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('album/:id')
    async addAlbum(@Param('id') id: string): Promise<void> {
        const fHelper = await this.favoriteService.addAlbum(id);
        if (fHelper) throw new HttpException(fHelper.message, fHelper.code);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('album/:id')
    async deleteAlbum(@Param('id') id: string): Promise<void> {
        const fHelper = await this.favoriteService.deleteAlbum(id);
        if (fHelper) throw new HttpException(fHelper.message, fHelper.code);
    }


    @HttpCode(HttpStatus.CREATED)
    @Post('artist/:id')
    async addArtist(@Param('id') id: string): Promise<void> {
        const fHelper = await this.favoriteService.addArtist(id);
        if (fHelper) throw new HttpException(fHelper.message, fHelper.code);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('artist/:id')
    async deleteArtist(@Param('id') id: string): Promise<void> {
        const fHelper = await this.favoriteService.deleteArtist(id);
        if (fHelper) throw new HttpException(fHelper.message, fHelper.code);
    }

}
