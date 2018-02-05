import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import TestUserEntity from './TestUserEntity';

@Table({ tableName: 'UnitManagerEmployees' })
export default class UnitManagerEmployeesEntity extends Model<UnitManagerEmployeesEntity> {
  @PrimaryKey
  @ForeignKey(() => TestUserEntity)
  @Column(DataType.STRING)
  public UnitManagerExternalId: string;

  @PrimaryKey
  @ForeignKey(() => TestUserEntity)
  @Column(DataType.STRING)
  public EmployeeExternalId: string;
}
