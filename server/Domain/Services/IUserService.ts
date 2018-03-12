export interface IUserService {
  registerUser(
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
  ): Promise<void>;
  verifyEmail(encrtyptedEmail: string): Promise<boolean>;
}
