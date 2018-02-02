class RepositoryBase<TEntity> implements IRepository<TEntity> {
  // protected _dbContext: DbContextType; (or connection)

  constructor(/*db context or connection object*/) {
    // _dbContext = dbContext;
  }

  public findById(id: any): TEntity {
    throw new Error('Method not implemented.');
  }
  public findAll(): TEntity[] {
    throw new Error('Method not implemented.');
  }
  public find(): TEntity[] {
    throw new Error('Method not implemented.');
  }
  public insert(entity: TEntity): void {
    throw new Error('Method not implemented.');
  }
  public update(entity: TEntity): void {
    throw new Error('Method not implemented.');
  }
  public remove(): void {
    throw new Error('Method not implemented.');
  }
  public removeById(id: any): void {
    throw new Error('Method not implemented.');
  }
}
