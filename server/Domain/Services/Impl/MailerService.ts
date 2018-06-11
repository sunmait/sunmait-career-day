import { injectable, inject } from 'inversify';
import { IMailerService } from '../IMailerService';
import * as nodemailer from 'nodemailer';
import { ISettingsProvider, IEmailCredentials } from '../../../API/infrastructure/index';

// TODO create type for message, it's { messageText, receiver, subject }
interface IEmailMessage {
  messageText: string;
  receiver: string;
  subject: string;
}

@injectable()
export class MailerService implements IMailerService {
  private readonly _emailCredentials: IEmailCredentials;
  private readonly _transporter: nodemailer.Transporter;

  constructor(@inject('SettingsProvider') settingsProvider: ISettingsProvider) {
    this._emailCredentials = settingsProvider.getEmailCredentials();
    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this._emailCredentials.username,
        pass: this._emailCredentials.password,
      },
    });
  }

  public combineVerifyEmailMessage(data: any): IEmailMessage {
    const message: IEmailMessage = {
      messageText: '',
      receiver: '',
      subject: '',
    };

    message.messageText = `Hi ${data.name}!<br/>
      Help us secure your account by verifying your email address (${data.email}).
      This lets you access all of features.<br/>
      <a href="${data.link}">Verify email address</a>
      <hr/>
      Button not working? Paste the following link into your browser:<br/>
      ${data.link}<br/>
      You’re receiving this email because you recently created a new Sunmait account.
      If this wasn’t you, please ignore this email.`;
    message.receiver = data.email;
    message.subject = 'Please verify your email address.';

    return message;
  }

  public combineArchiveTheDayMessage(data: any): IEmailMessage {
    const message: IEmailMessage = {
      messageText: '',
      receiver: '',
      subject: '',
    };

    message.messageText = `Hello, ${data.unitManagerName}!<br/>
      Career day of ${data.employeeName} is passed on ${data.careerDayDate}, but not archeeved.
      Would you like to archeeve it now? <br/>
      <a href="${data.link}">Open career day page of ${data.employeeName}</a>
      <hr/>
      Button not working? Paste the following link into your browser:<br/>
      ${data.link}`;
    message.receiver = data.email;
    message.subject = `Please archive career day of ${data.employeeName}`;

    return message;
  }

  public async sendEmail(data: IEmailMessage): Promise<void> {
    const mailOptions = {
      from: 'userCredentialService.email',
      to: data.receiver,
      subject: `[Sunmait] ${data.subject}`,
      html: data.messageText,
    };

    await this._transporter.sendMail(mailOptions);
  }
}
