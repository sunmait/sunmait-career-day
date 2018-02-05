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
} from 'sequelize-typescript';

import CareerDayEntity from './CareerDayEntity';
import StatusEntity from './StatusEntity';

@Table({ tableName: 'Objectives' })
export default class ObjectiveEntity extends Model<ObjectiveEntity> {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  public id: string;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  public CreatedAt: Date;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  public UpdatedAt: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  public Text: string;

  @AllowNull(false)
  @ForeignKey(() => StatusEntity)
  @Column(DataType.STRING)
  public StatusId: string;

  @Max(1)
  @Min(0)
  @Column(DataType.DOUBLE)
  public Progress: number;

  @AllowNull(false)
  @ForeignKey(() => CareerDayEntity)
  @Column(DataType.STRING)
  public CareerDayId: string;

  @BelongsTo(() => StatusEntity)
  public Status: StatusEntity;
}