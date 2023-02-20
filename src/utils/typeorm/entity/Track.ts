/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Track {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true, })
    artistId: string;

    @Column({ nullable: true, })
    albumId: string;

    @Column()
    duration: number;
}
