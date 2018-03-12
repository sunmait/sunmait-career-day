export interface IRepository<T> {
  findById(id: number): Promise<T>;

  findAll(filter: any): Promise<T[]>;

  findOne(filter: any): Promise<T>;

  create(entity: T): Promise<T>;

  update(entity: T): Promise<T>;

  remove(filter: any): Promise<boolean>;
}
