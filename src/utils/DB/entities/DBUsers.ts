import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
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
      updatedAt: 0,
      version: 0,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) return null;
    const changed = this.entities[idx];
    changed.password = dto.newPassword;
    changed.updatedAt = Date.now();
    changed.version += 1;
    this.entities.splice(idx, 1, changed);
    return changed;
  }
}
