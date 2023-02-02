/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/utils/DB/entities/DBUsers';


@Injectable()
export class UserService {

    constructor(private database: DbService) { }


    async getAllUser(): Promise<User[]> {
        return await this.database.users.getAll();
    }

    async getById(id: string): Promise<User> {
        return await this.database.users.findById(id);
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.database.users.create(dto);
    }

    async updateUser(id: string, dto: UpdatePasswordDto): Promise<User> {
        return this.database.users.update(id, dto);
    }

    async deleteUser(id: string): Promise<User> {
        return this.database.users.delete(id);
    }

}
