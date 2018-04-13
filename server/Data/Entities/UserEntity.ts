import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUrl,
  IsEmail,
  Default,
  AutoIncrement,
  AllowNull,
  CreatedAt,
  IsDate,
  UpdatedAt,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';
import ManagerEmployeesEntity from './ManagerEmployeesEntity';

@Table({ tableName: 'Users' })
export default class UserEntity extends Model<UserEntity> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public id: number;

  @IsDate
  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  public CreatedAt: Date;

  @IsDate
  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  public UpdatedAt: Date;

  @AllowNull(false)
  @Default('manager')
  @Column(DataType.STRING)
  public Role: string;

  @IsUrl
  @AllowNull(false)
  @Default('https://vk.com/images/camera_200.png')
  @Column(DataType.STRING)
  public PhotoUrl: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public LastName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public FirstName: string;

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public Email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public PasswordHash: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  public EmailVerified: boolean;

  @BelongsToMany(() => UserEntity, () => ManagerEmployeesEntity, 'UnitManagerId')
  public Employees: UserEntity[];
}
