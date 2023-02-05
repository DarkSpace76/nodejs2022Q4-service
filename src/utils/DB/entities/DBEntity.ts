/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { NoRequiredEntity } from '../errors/NoRequireEntity.error';


export default abstract class DBEntity<
  Entity extends { id: string },
  ChangeDTO,
  CreateDTO
> {
  protected entities: Entity[] = [];

  abstract create(createDto: CreateDTO): Promise<Entity>;

  async getAll(): Promise<Entity[]> {
    return this.entities;
  }

  async findById(id: string): Promise<Entity> {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) return null;
    return this.entities[idx];
  }

  async delete(id: string): Promise<Entity> {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) throw new NoRequiredEntity('delete');
    const deleted = this.entities[idx];
    this.entities.splice(idx, 1);
    return deleted;
  }

  async change(id: string, changeDTO: ChangeDTO): Promise<Entity> {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) throw new NoRequiredEntity('change');
    const changed = { ...this.entities[idx], ...changeDTO };
    this.entities.splice(idx, 1, changed);
    return changed;
  }

  async findMany(inArray: string[]): Promise<Entity[]> {
    let result: Entity[] = [];
    for (let id of inArray) {
      const idx = this.entities.findIndex((entity) => entity.id === id);
      if (idx !== -1) result.push(this.entities[idx]);
    }
    return result;
  }
}




