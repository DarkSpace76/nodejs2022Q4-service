/* eslint-disable prefer-const */
import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
export type CreateArtistDTO = Omit<Artist, 'id'>;
export type ChangeArtistDTO = Partial<Omit<Artist, 'id'>>;

export default class DBArtist extends DBEntity<
  Artist,
  ChangeArtistDTO,
  CreateArtistDTO
> {
  async create(dto: CreateArtistDTO) {
    const created: Artist = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
