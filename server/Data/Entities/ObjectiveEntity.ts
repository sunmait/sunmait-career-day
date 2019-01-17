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

import CareerDayEntity from './CareerDayEntity';
import StatusEntity from './StatusEntity';

@Table({ tableName: 'Objectives' })
export default class ObjectiveEntity extends Model<ObjectiveEntity> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public id!: number;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  public CreatedAt!: Date;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  public UpdatedAt!: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  public Title!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public Description!: string;

  @Max(1)
  @Min(0)
  @Default(0)
  @Column(DataType.FLOAT)
  public Progress!: number;

  @AllowNull(false)
  @ForeignKey(() => StatusEntity)
  @Default(2)
  @Column(DataType.INTEGER)
  public StatusId!: number;

  @AllowNull(false)
  @ForeignKey(() => CareerDayEntity)
  @Column(DataType.INTEGER)
  public CareerDayId!: number;

  @BelongsTo(() => StatusEntity)
  public Status!: StatusEntity;

  @BelongsTo(() => CareerDayEntity)
  public CareerDay!: CareerDayEntity;
}
