import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';

@Table({ tableName: 'Statuses' })
export default class StatusEntity extends Model<StatusEntity> {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  public id: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public Status: string;
}
