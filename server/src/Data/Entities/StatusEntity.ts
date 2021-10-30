import { Sequelize, Model, DataTypes } from 'sequelize';

export interface StatusAttributes {
  id: number;
  Status: string;
}

export interface StatusCreationAttributes extends StatusAttributes {}

export class StatusEntity
  extends Model<StatusAttributes, StatusCreationAttributes>
  implements StatusAttributes
{
  public id!: number;
  public Status!: string;
}

export const init = (sequelize: Sequelize) => {
  StatusEntity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'Statuses',
      sequelize,
    },
  );
};
