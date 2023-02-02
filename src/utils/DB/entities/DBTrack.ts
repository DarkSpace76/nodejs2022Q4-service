import DBEntity from './DBEntity';
import * as crypto from 'node:crypto';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
export type CreateTrackDTO = Omit<Track, 'id'>;
export type ChangeTrackDTO = Partial<Omit<Track, 'id'>>;

export default class DBTrack extends DBEntity<
  Track,
  ChangeTrackDTO,
  CreateTrackDTO
> {
  async create(dto: CreateTrackDTO) {
    const created: Track = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
