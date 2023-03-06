/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import DBAlbum from './utils/DB/entities/DBAlbum';
import DBArtist from './utils/DB/entities/DBArtist';
import DBTrack from './utils/DB/entities/DBTrack';
import DBUsers from './utils/DB/entities/DBUsers';
import { AppDataSource } from './utils/typeorm/data-source';
import { User } from './utils/typeorm/entity/User';
import { Artist } from './utils/typeorm/entity/Artist';
import { Track } from './utils/typeorm/entity/Track';
import { Album } from './utils/typeorm/entity/Album';
import DBFavorites from './utils/DB/entities/DBFavorites';
@Injectable()
export class DbService {
    users = new DBUsers(AppDataSource.manager.getRepository(User));
    artists = new DBArtist(AppDataSource.manager.getRepository(Artist));
    tracks = new DBTrack(AppDataSource.manager.getRepository(Track));
    albums = new DBAlbum(AppDataSource.manager.getRepository(Album));
    favorites = new DBFavorites();

    constructor() {
        AppDataSource.initialize().then(async () => {
            console.log('data base init');

        }).catch(error => console.log(error));
    }

}
