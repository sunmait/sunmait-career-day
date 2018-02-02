interface IRepository<TEntity> {
  findById(id: any): TEntity;

  findAll(): TEntity[];

  find /*predicate*/(): TEntity[];

  insert(entity: TEntity): void;

  update(entity: TEntity): void;

  remove /*predicate*/(): void;

  removeById(id: any): void;

  // count, any and so on
}
