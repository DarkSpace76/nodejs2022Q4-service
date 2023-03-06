/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { AppServiceExtends } from 'src/service.extends';
import { FavType } from 'src/utils/DB/entities/DBFavorites';
import { ChangeTrackDTO, CreateTrackDTO } from 'src/utils/DB/entities/DBTrack';
import { Track } from 'src/utils/typeorm/entity/Track';


@Injectable()
export class TrackService extends AppServiceExtends<Track, CreateTrackDTO, ChangeTrackDTO>{

    constructor(private database: DbService) {
        super();
    }

    async getAll(): Promise<Track[]> {
        return this.database.tracks.getAll();
    }
    async getById(id: string): Promise<Track> {
        return this.database.tracks.findById(id);
    }
    async create(dto: CreateTrackDTO): Promise<Track> {
        return this.database.tracks.create(dto);
    }
    async update(id: string, dto: Partial<Omit<Track, 'id'>>): Promise<Track> {
        return this.database.tracks.change(id, dto);
    }
    async delete(id: string): Promise<Track> {
        const deleteTrack = await this.database.tracks.findById(id);
        if (deleteTrack)
            await this.database.tracks.delete(deleteTrack.id);
        await this.database.favorites.delete(deleteTrack.id, FavType.track);

        return deleteTrack;
    }



}

