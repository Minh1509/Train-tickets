import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { config } from '@config';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: config.MAIL_HOST,
                port: config.MAIL_PORT,
                secure: true,
                auth: {
                    user: config.MAIL_USER,
                    pass: config.MAIL_PASS,
                },
            },
            defaults: {
                from: `"Train Ticket Sale" <${process.env.MAIL_FROM}>`,
            },
            template: {
                dir: join(__dirname, './templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }