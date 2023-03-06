/* eslint-disable prettier/prettier */
export abstract class AppServiceExtends<T, CreateDto, UpdateDto> {
    abstract getAll(): Promise<T[]>;
    abstract getById(id: string): Promise<T>;
    abstract create(dto: CreateDto): Promise<T>;
    abstract update(id: string, dto: UpdateDto): Promise<T>;
    abstract delete(id: string): Promise<T>;
}
