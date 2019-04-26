import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Unique,
  PrimaryKey,
  AllowNull,
  IsDate,
  IsAfter,
  Max,
  Min,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  Default,
} from 'sequelize-typescript';
import ObjectiveEntity from './ObjectiveEntity';

@Table({tableName: 'ProgressObjective' })
export default class ProgressObjectiveEntity extends Model<ProgressObjectiveEntity> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public id!: number;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => ObjectiveEntity)
  @Column(DataType.INTEGER)
  public ObjectiveId!: number;

  @Max(1)
  @Min(0)
  @Default(0)
  @Column(DataType.FLOAT)
  public Progress!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public Description!: string;

  @BelongsTo(() => ObjectiveEntity)
  public ObjectiveEntity!: ObjectiveEntity;
}
