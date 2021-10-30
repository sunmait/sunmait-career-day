import { Sequelize, Model, DataTypes } from 'sequelize';

export interface ManagerEmployeesAttributes {
  UnitManagerId: string;
  EmployeeId: string;
}

export interface ManagerEmployeesCreationAttributes extends ManagerEmployeesAttributes {}

export class ManagerEmployeesEntity
  extends Model<ManagerEmployeesAttributes, ManagerEmployeesCreationAttributes>
  implements ManagerEmployeesAttributes
{
  public UnitManagerId!: string;
  public EmployeeId!: string;
}

export const init = (sequelize: Sequelize) => {
  ManagerEmployeesEntity.init(
    {
      UnitManagerId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      EmployeeId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      tableName: 'ManagerEmployees',
      sequelize,
    },
  );
};
