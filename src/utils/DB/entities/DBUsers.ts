/* eslint-disable prettier/prettier */
import * as crypto from 'node:crypto';

import { Exclude } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';
import DBEntity from './DBEntity';
import { AppDataSource } from 'src/utils/typeorm/data-source';
import { User as UserEntity } from 'src/utils/typeorm/entity/User';
import * as bcrypt from 'bcrypt';

export class UserDto {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

//type CreateUsersDto = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'version'>;
type ChangeUserDTO = Partial<Omit<UserEntity, 'id'>>;

export default class DBUsers extends DBEntity<
  UserEntity,
  ChangeUserDTO,
  CreateUserDto
> {
  async create(dto: CreateUserDto) {
    const hashPassword = bcrypt.hashSync(dto.password, 7);
    console.log(hashPassword);
    const user = await this.findByName(dto.login);
    /* if (user)
      throw new HttpException('user with this login already exists', HttpStatus.FORBIDDEN); */
    const created: UserEntity = {
      ...dto,
      password: hashPassword,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      id: crypto.randomUUID(),
    };
    const newUser = await AppDataSource.getRepository(UserEntity).save(created);
    return newUser;
  }

  async findByName(login: string) {
    return await this.entities.findOne({
      where:
        { login: login }
    });
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const obj = await this.entities.findOne({
      where: { id: id }
    });
    if (!obj) return null;

    bcrypt.compareSync(dto.oldPassword, obj.password);
    if (!bcrypt.compareSync(dto.oldPassword, obj.password))
      throw new HttpException('Password mismatch', HttpStatus.FORBIDDEN);
    obj.password = bcrypt.hashSync(dto.newPassword, 7);
    obj.updatedAt = Date.now();
    obj.version += 1;
    await this.entities.update({ id }, { ...obj });
    return obj;
  }
}
