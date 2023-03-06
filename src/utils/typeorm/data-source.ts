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
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Album, Track, Artist, FavArtist, FavTrack, FavAlbum],
    migrations: [],
    subscribers: [],
})
