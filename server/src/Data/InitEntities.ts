import { Sequelize } from 'sequelize/types';

import { CareerDayEntity, init as initCareerDayEntity } from './Entities/CareerDayEntity';
import { init as iniManagerEmployeesEntity } from './Entities/ManagerEmployeesEntity';
import { init as iniObjectiveEntity, ObjectiveEntity } from './Entities/ObjectiveEntity';
import { init as iniStatusEntity } from './Entities/StatusEntity';

export class InitEntities {
  constructor(sequelize: Sequelize) {
    this.initModels(sequelize);
  }

  initModels(sequelize: Sequelize) {
    initCareerDayEntity(sequelize);
    iniManagerEmployeesEntity(sequelize);
    iniObjectiveEntity(sequelize);
    iniStatusEntity(sequelize);

    CareerDayEntity.hasMany(ObjectiveEntity, { foreignKey: 'CareerDayId', as: 'Objectives' });
  }
}
