import { inject, injectable } from 'tsyringe';
import mailConfig from '@config/mail';
import Sparkpost from 'sparkpost';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class SparkPostMailProvider implements IMailProvider {
  private client;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = new Sparkpost(process.env.SPARKPOST_API_KEY);
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;

    await this.client.transmissions.send({
      content: {
        from: {
          name: from?.name || name,
          email: from?.email || email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      },
      recipients: [{ address: to.email }],
    });
  }
}
