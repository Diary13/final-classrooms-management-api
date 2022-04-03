import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { BranchsModule } from 'src/branchs/branchs.module';
import { EdtModule } from 'src/edt/edt.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { SendMailController } from './controllers/send-mail/send-mail.controller';
import { SendMailService } from './services/send-mail/send-mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    RoomsModule,
    EdtModule,
    BranchsModule,
    StudentsModule
  ],
  controllers: [SendMailController],
  providers: [SendMailService],
  exports: [SendMailService]
})
export class SendMailModule { }
