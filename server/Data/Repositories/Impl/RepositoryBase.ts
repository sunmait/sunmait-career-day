import { injectable } from 'inversify';
import { IRepository } from '../index';
import { Model } from 'sequelize-typescript';

@injectable()
export class RepositoryBase<TEntity extends Model<any>>
  implements IRepository<TEntity> {
  private _entityType: any;

  constructor(entityType: any) {
    this._entityType = entityType;
  }

  public async findById(id: number, options: any = {}): Promise<TEntity> {
    return this._entityType.findById(id, options);
  }
  public async findAll(filter: any, options: any = {}): Promise<TEntity[]> {
    return this._entityType.findAll(filter, options);
  }
  public async findOne(filter: any, options: any = {}): Promise<TEntity> {
    return this._entityType.find(filter, options);
  }
  public async create(entity: TEntity): Promise<TEntity> {
    return entity.save();
  }
  public async update(entity: TEntity): Promise<TEntity> {
    return entity.save();
  }
  public async remove(filter: any): Promise<boolean> {
    return this._entityType.destroy(filter);
  }
}
