/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { AppServiceExtends } from 'src/service.extends';
import { ChangeTrackDTO, CreateTrackDTO, Track } from 'src/utils/DB/entities/DBTrack';


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
        const track = await this.database.tracks.delete(id);
        if (track)
            await this.database.favorites.deleteTrack(track.id);

        return track;
    }



}

