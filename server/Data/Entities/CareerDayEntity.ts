import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  IsDate,
  IsAfter,
  PrimaryKey,
  Unique,
  HasMany,
  Default,
  AutoIncrement,
} from 'sequelize-typescript';
import ObjectiveEntity from '../Entities/ObjectiveEntity';

@Table({ tableName: 'CareerDays' })
export default class CareerDayEntity extends Model<CareerDayEntity> {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

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

  @Default(false)
  @Column(DataType.BOOLEAN)
  public Archived: boolean;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public EmployeeId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public UnitManagerId: number;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @Column(DataType.DATE)
  public InterviewDate: Date;

  @HasMany(() => ObjectiveEntity)
  public Objectives: ObjectiveEntity[];
}
