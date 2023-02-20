/* eslint-disable prettier/prettier */
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Album } from "./entity/Album"
import { Artist } from "./entity/Artist"
import { Track } from "./entity/Track"
import { FavAlbum, FavArtist, FavTrack } from "./entity/Favorites"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "pas",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Album, Track, Artist, FavArtist, FavTrack, FavAlbum],
    migrations: [],
    subscribers: [],
})
