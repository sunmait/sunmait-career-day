import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';

@Table({ tableName: 'ManagerEmployees' })
export default class ManagerEmployeesEntity extends Model<
  ManagerEmployeesEntity
> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  public UnitManagerId!: string;

  @PrimaryKey
  @Unique
  @AllowNull(false)
  @Column(DataType.UUID)
  public EmployeeId!: string;
}
