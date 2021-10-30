import { Sequelize, Dialect, Op } from 'sequelize';
import { inject, injectable } from 'inversify';
import { ISettingsProvider, IDatabaseSettings } from '../API/providers';

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};
@injectable()
export class DbContext {
  private _sequelize: Sequelize;
  private _settingsProvider: ISettingsProvider;
  constructor(@inject('SettingsProvider') settingsProvider: ISettingsProvider) {
    this._settingsProvider = settingsProvider;
    const settings: IDatabaseSettings = this._settingsProvider.getDatabaseSettings();

    this._sequelize = new Sequelize(settings.database, settings.username, settings.password, {
      host: settings.host,
      port: settings.port,
      dialect: settings.dialect as Dialect,
      operatorsAliases,
    });
  }

  public async connect(): Promise<void> {
    await this._sequelize.authenticate();
  }

  public async query(...args: Parameters<Sequelize['query']>) {
    return this._sequelize.query(...args);
  }
}
