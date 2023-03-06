/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { AppServiceExtends } from 'src/service.extends';
import { ChangeAlbumDTO, CreateAlbumDTO } from 'src/utils/DB/entities/DBAlbum';
import { FavType } from 'src/utils/DB/entities/DBFavorites';
import { Album } from 'src/utils/typeorm/entity/Album';

@Injectable()
export class AlbumService extends AppServiceExtends<Album, CreateAlbumDTO, ChangeAlbumDTO>{
    constructor(private database: DbService) {
        super();
    }

    async getAll(): Promise<Album[]> {
        return this.database.albums.getAll();
    }
    async getById(id: string): Promise<Album> {
        return this.database.albums.findById(id);
    }
    async create(dto: CreateAlbumDTO): Promise<Album> {
        return this.database.albums.create(dto);
    }
    async update(id: string, dto: ChangeAlbumDTO): Promise<Album> {
        return this.database.albums.change(id, dto);
    }
    async delete(id: string): Promise<Album> {
        const deleteAlbum = await this.database.albums.findById(id);

        if (deleteAlbum) {
            await this.database.albums.delete(deleteAlbum.id);
            await this.database.tracks.deleteAlbum(deleteAlbum.id);
            await this.database.favorites.delete(deleteAlbum.id, FavType.album);
        }
        return deleteAlbum;
    }

}
