import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
export type CreateAlbumDTO = Omit<Album, 'id'>;
export type ChangeAlbumDTO = Partial<Omit<Album, 'id'>>;

export default class DBAlbum extends DBEntity<
  Album,
  ChangeAlbumDTO,
  CreateAlbumDTO
> {
  async create(dto: CreateAlbumDTO) {
    const created: Album = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
