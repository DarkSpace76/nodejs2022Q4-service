/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { DbService } from 'src/db.service';
import { ResponseFavorites } from 'src/utils/DB/entities/DBFavorites';
import FavoritesHelper from 'src/utils/favs.helper';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {

    constructor(private database: DbService) {
    }

    async getAll(): Promise<ResponseFavorites> {
        const fav = await this.database.favorites.getAll();
        return {
            artists: await this.database.artists.findMany(fav.artists),
            albums: await this.database.albums.findMany(fav.albums),
            tracks: await this.database.tracks.findMany(fav.tracks),
        }
    }

    async addTrack(id: string): Promise<FavoritesHelper> {

        if (!validate(id)) return new FavoritesHelper(StatusCodes.BAD_REQUEST, 'track id not valid');
        if (!await this.database.tracks.findById(id)) return new FavoritesHelper(StatusCodes.UNPROCESSABLE_ENTITY, 'track  not exists');

        if (!await this.database.favorites.findTrack(id)) {
            await this.database.favorites.addTrack(id);
            return;
        }
        else
            return new FavoritesHelper(StatusCodes.CREATED, 'track already exists');
    }

    async deleteTrack(id: string): Promise<FavoritesHelper> {

        if (!validate(id)) return new FavoritesHelper(StatusCodes.BAD_REQUEST, 'track id not valid');

        if (await this.database.favorites.findTrack(id)) {
            await this.database.favorites.deleteTrack(id);
            return;
        }
        else
            return new FavoritesHelper(StatusCodes.CREATED, 'track is not featured');
    }

    async addAlbum(id: string): Promise<FavoritesHelper> {

        if (!validate(id)) return new FavoritesHelper(StatusCodes.BAD_REQUEST, 'album id not valid');
        if (!await this.database.albums.findById(id)) return new FavoritesHelper(StatusCodes.UNPROCESSABLE_ENTITY, 'album  not exists');

        if (!await this.database.favorites.findAlbum(id)) {
            await this.database.favorites.addAlbum(id);
            return;
        }
        else
            return new FavoritesHelper(StatusCodes.CREATED, 'album already exists');
    }

    async deleteAlbum(id: string): Promise<FavoritesHelper> {

        if (!validate(id)) return new FavoritesHelper(StatusCodes.BAD_REQUEST, 'album id not valid');

        if (await this.database.favorites.findAlbum(id)) {
            await this.database.favorites.deleteAlbum(id);
            return;
        }
        else
            return new FavoritesHelper(StatusCodes.CREATED, 'album is not featured');
    }

    async addArtist(id: string): Promise<FavoritesHelper> {

        if (!validate(id)) return new FavoritesHelper(StatusCodes.BAD_REQUEST, 'artists id not valid');
        if (!await this.database.artists.findById(id)) return new FavoritesHelper(StatusCodes.UNPROCESSABLE_ENTITY, 'artists  not exists');

        if (!await this.database.favorites.findArtist(id)) {
            await this.database.favorites.addArtist(id);
            return;
        }
        else
            return new FavoritesHelper(StatusCodes.CREATED, 'artists already exists');
    }

    async deleteArtist(id: string): Promise<FavoritesHelper> {

        if (!validate(id)) return new FavoritesHelper(StatusCodes.BAD_REQUEST, 'artists id not valid');

        if (await this.database.favorites.findArtist(id)) {
            await this.database.favorites.deleteArtist(id);
            return;
        }
        else
            return new FavoritesHelper(StatusCodes.CREATED, 'artists is not featured');
    }

}


