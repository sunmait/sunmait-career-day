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
} from 'sequelize-typescript';
import ObjectiveEntity from '../Entities/ObjectiveEntity';

@Table({ tableName: 'CareerDays' })
export default class CareerDayEntity extends Model<CareerDayEntity> {
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

  @Column(DataType.BOOLEAN)
  public Archived: boolean;

  @AllowNull(false)
  @Column(DataType.STRING)
  public EmployeeExternalId: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public UnitManagerExternalId: string;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @Column(DataType.DATE)
  public InterviewDate: Date;

  @HasMany(() => ObjectiveEntity)
  public Objectives: ObjectiveEntity[];
}
