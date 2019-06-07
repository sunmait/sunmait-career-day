export interface IRepository<T, TKey> {
  findById(id: TKey, options?: any): Promise<T>;

  findAll(filter: any, options?: any): Promise<T[]>;

  findOne(filter: any, options?: any): Promise<T>;

  create(entity: T): Promise<T>;

  update(entity: T): Promise<T>;

  remove(filter: any): Promise<boolean>;
}
