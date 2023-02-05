/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import DBUsers from './utils/DB/entities/DBUsers';
import DBArtist from './utils/DB/entities/DBArtist';
import DBTrack from './utils/DB/entities/DBTrack';
import DBAlbum from './utils/DB/entities/DBAlbum';
import DBFavorites from './utils/DB/entities/DBFavorites';

@Injectable()
export class DbService {
    users = new DBUsers();
    artists = new DBArtist();
    tracks = new DBTrack();
    albums = new DBAlbum();
    favorites = new DBFavorites();
}
