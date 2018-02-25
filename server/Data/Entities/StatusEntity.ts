import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'Statuses' })
export default class StatusEntity extends Model<StatusEntity> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public Status: string;
}
