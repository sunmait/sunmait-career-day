import { injectable, inject } from 'inversify';
import { IMailerService } from '../IMailerService';
import * as nodemailer from 'nodemailer';
import { ISettingsProvider, IEmailCredentials } from '../../../API/providers';

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

  public async sendEmail(data: any): Promise<void> {
    const message = `Hi ${data.name}!<br/>
      Help us secure your account by verifying your email address (${
        data.email
      }).
      This lets you access all of features.<br/>
      <a href="${data.link}">Verify email address</a>
      <hr/>
      Button not working? Paste the following link into your browser:<br/>
      ${data.link}<br/>
      You’re receiving this email because you recently created a new Sunmait account.
      If this wasn’t you, please ignore this email.`;

    const mailOptions = {
      from: 'userCredentialService.email',
      to: data.email,
      subject: '[Sunmait] Please verify your email address.',
      html: message,
    };

    await this._transporter.sendMail(mailOptions);
  }
}
