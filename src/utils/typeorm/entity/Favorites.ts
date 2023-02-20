/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn } from 'typeorm';


@Entity()
export class FavTrack {

    @PrimaryColumn()
    id: string;
}

@Entity()
export class FavAlbum {

    @PrimaryColumn()
    id: string;
}

@Entity()
export class FavArtist {

    @PrimaryColumn()
    id: string;
}


