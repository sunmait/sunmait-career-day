export default interface IUserDecodedFromToken {
  id: number;
  Roles: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  PhotoUrl: string;
  LastName: string;
  FirstName: string;
  Email: string;
  PasswordHash: string;
  EmailVerified: boolean;
  iat: number;
  exp: number;
}
