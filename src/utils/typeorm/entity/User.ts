/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    version: number;

    @Column({
        type: 'timestamp',
        transformer: {
            from: (value: Date) => new Date(value).getTime(),
            to: (value: number) => new Date(value).toISOString(),
        },
    })
    createdAt: number;

    @Column({
        type: 'timestamp',
        transformer: {
            from: (value: Date) => new Date(value).getTime(),
            to: (value: number) => new Date(value).toISOString(),
        },
    })
    updatedAt: number;


}

