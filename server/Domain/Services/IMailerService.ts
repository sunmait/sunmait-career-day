export interface IMailerService {
  sendEmail(data: any): Promise<void>;
  combineVerifyEmailMessage(data: any): any;
  combineArchiveTheDayMessage(data: any): any;
}
