/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { AppServiceExtends } from 'src/service.extends';
import { CreateUserDto, UpdatePasswordDto } from 'src/utils/DB/entities/DBUsers';
import { User } from 'src/utils/typeorm/entity/User';


@Injectable()
export class UserService extends AppServiceExtends<User, CreateUserDto, UpdatePasswordDto> {
    constructor(private database: DbService) {
        super();
    }

    async getAll(): Promise<User[]> {
        return this.database.users.getAll();
    }
    async getById(id: string): Promise<User> {
        return this.database.users.findById(id);
    }
    async getByName(id: string): Promise<User> {
        return this.database.users.findByName(id);
    }
    async create(dto: CreateUserDto): Promise<User> {
        return this.database.users.create(dto);
    }
    async update(id: string, dto: UpdatePasswordDto): Promise<User> {
        return this.database.users.update(id, dto);
    }
    async delete(id: string): Promise<User> {
        return this.database.users.delete(id);
    }




}
