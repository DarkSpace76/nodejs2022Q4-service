/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { AppServiceExtends } from 'src/service.extends';

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
        return this.database.artists.delete(id);
    }



}
