import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

import { ObjectiveEntity } from './ObjectiveEntity';

export interface CareerDayAttributes {
  id: number;
  Archived: boolean;
  EmployeeId: string;
  UnitManagerId: string;
  InterviewDate: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface CareerDayCreationAttributes extends Optional<CareerDayAttributes, 'id'> {}

export class CareerDayEntity
  extends Model<CareerDayAttributes, CareerDayCreationAttributes>
  implements CareerDayAttributes
{
  public id!: number;
  public Archived!: boolean;
  public EmployeeId!: string;
  public UnitManagerId!: string;
  public InterviewDate!: Date;
  // timestamps
  public CreatedAt!: Date;
  public UpdatedAt!: Date;

  // associations
  public Objectives?: ObjectiveEntity[];
}

export const init = (sequelize: Sequelize) => {
  CareerDayEntity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      EmployeeId: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      UnitManagerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      InterviewDate: {
        type: DataTypes.DATE,
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
      tableName: 'CareerDays',
      timestamps: true,
      sequelize,
    },
  );
};
