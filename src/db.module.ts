/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DbService } from './db.service';

@Module({
    imports: [],
    providers: [DbService],
    exports: [DbService]
})
export class DbModule { }
