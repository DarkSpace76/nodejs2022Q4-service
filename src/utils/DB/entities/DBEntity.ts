/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { In, ObjectLiteral, Repository } from 'typeorm';


export default abstract class DBEntity<
  T,
  ChangeDTO,
  CreateDTO
> {
  protected entities;

  constructor(repo: Repository<ObjectLiteral>) {
    this.entities = repo;
  }

  abstract create(createDto: CreateDTO): Promise<T>;

  async getAll(): Promise<T[]> {
    return await this.entities.find();
  }

  async findById(id: string): Promise<T> {
    return await this.entities.findOne({
      where:
        { id: id }
    });

  }

  async delete(id: string): Promise<T> {
    return await this.entities.delete({ id: id });
  }

  async change(id: string, changeDTO: ChangeDTO): Promise<T> {
    await this.entities.update({ id: id }, { ...changeDTO });
    return await this.entities.findOne({
      where:
        { id: id }
    });

  }

  async findMany(inArray: string[]): Promise<[]> {

    return await this.entities
      .find({
        where: { id: In(inArray) },
      });

  }
}




