import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUrl,
} from 'sequelize-typescript';

@Table({ tableName: 'TestUsers' })
export default class TestUserEntity extends Model<TestUserEntity> {
  @PrimaryKey
  @Column(DataType.STRING)
  public id: string;

  @Column(DataType.STRING) public Roles: string;

  @IsUrl
  @Column(DataType.STRING)
  public PhotoUrl: string;

  @Column(DataType.STRING) public LastName: string;

  @Column(DataType.STRING) public FirstName: string;

  @Column(DataType.STRING) public AccessToken: string;
}
