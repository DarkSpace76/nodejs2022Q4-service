/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';
import { Artist } from 'src/utils/typeorm/entity/Artist';
import { AppDataSource } from 'src/utils/typeorm/data-source';


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
    const newArtist = await AppDataSource.getRepository(Artist).save(created);
    return newArtist;
  }

  /* async update(id: string, dto: ChangeArtistDTO) {
    const obj = await this.entities.findOne({
      where: { id: id }
    });
    if (!obj) return null;
    obj
    await this.entities.update({ id }, { ...dto });
    return obj;
  } */
}
