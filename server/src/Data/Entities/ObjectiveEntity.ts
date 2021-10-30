import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

import { CareerDayEntity } from './CareerDayEntity';
import { StatusEntity } from './StatusEntity';

export interface ObjectiveAttributes {
  id: number;
  Title: string;
  Description: string;
  Progress: number;
  StatusId: number;
  CareerDayId: number;

  // timestamps
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface ObjectiveCreationAttributes extends Optional<ObjectiveAttributes, 'id'> {}

export class ObjectiveEntity
  extends Model<ObjectiveAttributes, ObjectiveCreationAttributes>
  implements ObjectiveAttributes
{
  public id!: number;
  public Title!: string;
  public Description!: string;
  public Progress!: number;
  public StatusId!: number;
  public CareerDayId!: number;

  // timestamps
  public CreatedAt!: Date;
  public UpdatedAt!: Date;

  // associations
  public Status?: StatusEntity;
  public CareerDay?: CareerDayEntity;
}

export const init = (sequelize: Sequelize) => {
  ObjectiveEntity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Progress: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: { min: 0, max: 1 },
      },
      StatusId: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
        allowNull: false,
      },
      CareerDayId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'CreatedAt',
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'UpdatedAt',
      },
    },
    {
      tableName: 'Objectives',
      timestamps: true,
      sequelize,
    },
  );
};
