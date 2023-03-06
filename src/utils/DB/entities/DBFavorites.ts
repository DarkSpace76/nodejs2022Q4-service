/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { AppDataSource } from "src/utils/typeorm/data-source";
import { FavAlbum, FavArtist, FavTrack } from "src/utils/typeorm/entity/Favorites";

export interface ResponseFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export enum FavType {
  artist = 'artistId',
  album = 'albumId',
  track = 'trackId'
}

export default class DBFavorites {
  protected favTrack;
  protected favAlbum;
  protected favArtist;

  constructor() {
    this.favAlbum = AppDataSource.manager.getRepository(FavAlbum);
    this.favArtist = AppDataSource.manager.getRepository(FavArtist);
    this.favTrack = AppDataSource.manager.getRepository(FavTrack);

  }

  async getAll(): Promise<ResponseFavorites> {
    /*    const arr1 = (await this.favArtist.find()).map(val => val.id);
       const arr2 = (await this.favAlbum.find()).map(val => val.id);
       const arr3 = (await this.favTrack.find()).map(val => val.id);
    */
    return {
      artists: (await this.favArtist.find()).map(val => val.id),
      albums: (await this.favAlbum.find()).map(val => val.id),
      tracks: (await this.favTrack.find()).map(val => val.id)
    }
  }


  async add(id: string, favType: string): Promise<void> {

    switch (favType) {
      case FavType.album:
        await this.favAlbum.save({ id });
        break;

      case FavType.track:
        await this.favTrack.save({ id });
        break;

      case FavType.artist:
        await this.favArtist.save({ id: id });
        break;

    }


  }

  async delete(id: string, favType: string): Promise<void> {

    switch (favType) {
      case FavType.album:
        await this.favAlbum.delete({ id: id });
        break;

      case FavType.track:
        await this.favTrack.delete({ id: id });
        break;

      case FavType.artist:
        await this.favArtist.delete({ id: id });
        break;

    }
  }

  async find(id: string, favType: string): Promise<boolean> {

    let result;
    switch (favType) {
      case FavType.album:
        result = await this.favAlbum.findOne({ where: { id: id } });
        break;

      case FavType.track:
        result = await this.favTrack.findOne({ where: { id: id } });
        break;

      case FavType.artist:
        result = await this.favArtist.findOne({ where: { id: id } });
        break;
    }

    return result !== null
  }

}
