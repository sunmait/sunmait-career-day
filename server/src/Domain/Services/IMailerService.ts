export interface IMailerService {
  sendEmail(data: any): Promise<void>;
}
