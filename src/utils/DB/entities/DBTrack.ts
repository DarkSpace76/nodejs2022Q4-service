/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { AppDataSource } from 'src/utils/typeorm/data-source';
import DBEntity from './DBEntity';
import * as crypto from 'node:crypto';
import { Track } from 'src/utils/typeorm/entity/Track';

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
    const newTrack = await AppDataSource.getRepository(Track).save(created);

    return newTrack;
  }
  async deleteArtist(artistId: string) {

    const find = await AppDataSource.getRepository(Track).find({ where: { artistId: artistId } });
    for (let item of find) {
      item.artistId = null;
      await AppDataSource.getRepository(Track).update({ id: item.id }, { artistId: null });
    }
  }
  async deleteAlbum(albumId: string) {
    const find = await AppDataSource.getRepository(Track).find({ where: { albumId: albumId } });
    for (let item of find) {
      item.albumId = null;
      await AppDataSource.getRepository(Track).update({ id: item.id }, { albumId: null });
    }

  }

  /*   async update(id: string, dto: ChangeTrackDTO) {
      const obj = await this.entities.findOne({
        where: { id: id }
      });
      if (!obj) return null;
  
      await this.entities.update({ id }, { ...dto });
      return obj;
    } */
}
