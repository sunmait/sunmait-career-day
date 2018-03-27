import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  PrimaryKey,
  AllowNull,
  IsDate,
  IsAfter,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  Default,
} from 'sequelize-typescript';

import UserEntity from './UserEntity';

@Table({ tableName: 'Sessions' })
export default class SessionEntity extends Model<SessionEntity> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public id: number;

  @AllowNull(false)
  @ForeignKey(() => UserEntity)
  @Default(2)
  @Column(DataType.INTEGER)
  public UserId: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING({ length: 700 }))
  public AccessToken: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public RefreshToken: string;

  @IsDate
  @IsAfter(new Date().toDateString())
  @AllowNull(false)
  @Column(DataType.DATE)
  public LastRefresh: Date;

  @IsDate
  @IsAfter(new Date().toDateString())
  @AllowNull(false)
  @Column(DataType.DATE)
  public ExpiresIn: Date;

  @BelongsTo(() => UserEntity)
  public User: UserEntity;
}
