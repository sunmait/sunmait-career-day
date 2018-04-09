import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  PrimaryKey,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import UserEntity from './UserEntity';

@Table({ tableName: 'ManagerEmployees' })
export default class ManagerEmployeesEntity extends Model<ManagerEmployeesEntity> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public UnitManagerId: number;

  @PrimaryKey
  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => UserEntity)
  public EmployeeId: number;
}
