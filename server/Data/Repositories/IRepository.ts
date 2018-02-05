export interface IRepository<T> {
  findById(id: string): Promise<T>;

  findAll(filter: any): Promise<T[]>;

  find(filter: any): Promise<T[]>;

  create(entity: T): Promise<T>;

  update(entity: T): Promise<T>;

  remove(entity: T): Promise<boolean>;
}
