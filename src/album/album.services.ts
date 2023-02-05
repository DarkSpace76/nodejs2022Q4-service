/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { AppServiceExtends } from 'src/service.extends';
import { Album, ChangeAlbumDTO, CreateAlbumDTO } from 'src/utils/DB/entities/DBAlbum';

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
        const album = await this.database.albums.delete(id);
        if (album) {
            await this.database.tracks.deleteAlbum(album.id);
            await this.database.favorites.deleteAlbum(album.id);
        }
        return album;
    }

}
