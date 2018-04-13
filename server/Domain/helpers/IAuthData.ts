export interface IAuthData {
  AccessToken: string;
  RefreshToken: string;
  Data: {
    id: number;
    Role: string;
    FirstName: string;
    LastName: string;
    PhotoUrl: string;
  };
}
