/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { AppServiceExtends } from 'src/service.extends';
import { FavType } from 'src/utils/DB/entities/DBFavorites';

export interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
}
type CreateArtistDTO = Omit<Artist, 'id'>;
type ChangeArtistDTO = Partial<Omit<Artist, 'id'>>;


@Injectable()
export class ArtistService extends AppServiceExtends<Artist, CreateArtistDTO, ChangeArtistDTO>{

    constructor(private database: DbService) {
        super();
    }

    async getAll(): Promise<Artist[]> {
        return this.database.artists.getAll();
    }
    async getById(id: string): Promise<Artist> {
        return this.database.artists.findById(id);
    }
    async create(dto: CreateArtistDTO): Promise<Artist> {
        return this.database.artists.create(dto);
    }
    async update(id: string, dto: Partial<Omit<Artist, 'id'>>): Promise<Artist> {
        return this.database.artists.change(id, dto);
    }
    async delete(id: string): Promise<Artist> {
        const deleteArtist = await this.database.artists.findById(id);

        if (deleteArtist) {
            await this.database.artists.delete(deleteArtist.id);
            await this.database.tracks.deleteArtist(deleteArtist.id);
            await this.database.albums.deleteArtist(deleteArtist.id);
            await this.database.favorites.delete(deleteArtist.id, FavType.artist);
        }
        return deleteArtist;
    }



}
