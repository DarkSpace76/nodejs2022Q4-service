import * as crypto from 'node:crypto';

import { Exclude } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';
import DBEntity from './DBEntity';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class UserEntity {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
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
type ChangeUserDTO = Partial<Omit<User, 'id'>>;

export default class DBUsers extends DBEntity<
  User,
  ChangeUserDTO,
  CreateUserDto
> {
  async create(dto: CreateUserDto) {
    const created: User = {
      ...dto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) return null;
    const changed = this.entities[idx];
    if (changed.password !== dto.oldPassword)
      throw new HttpException('Password mismatch', HttpStatus.FORBIDDEN);
    changed.password = dto.newPassword;
    changed.updatedAt = Date.now();
    changed.version += 1;
    this.entities.splice(idx, 1, changed);
    return changed;
  }
}
