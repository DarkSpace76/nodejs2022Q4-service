/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';
import { AppDataSource } from 'src/utils/typeorm/data-source';
import { Album } from 'src/utils/typeorm/entity/Album';


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
      artistId: dto.artistId,
      id: crypto.randomUUID(),
    };
    console.log(created);

    //await AppDataSource.getRepository(Album).save(created);
    const createdresult = await AppDataSource.getRepository(Album).save(created);

    return createdresult;
  }
  async deleteArtist(artistId: string) {
    console.log(`delete artist ${artistId}`);

    // await AppDataSource.getRepository(Album).update({ artistId: artistId }, { artistId: null });
    const find = await AppDataSource.getRepository(Album).find({ where: { artistId: artistId } });
    for (let item of find) {
      item.artistId = null;
      await AppDataSource.getRepository(Album).update({ id: item.id }, { artistId: null });
    }
  }
}
