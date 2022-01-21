import { Module } from '@nestjs/common';
import { BranchsModule } from 'src/branchs/branchs.module';
import { EdtModule } from 'src/edt/edt.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { SendMailController } from './controllers/send-mail/send-mail.controller';
import { SendMailService } from './services/send-mail/send-mail.service';

@Module({
  imports: [RoomsModule, EdtModule, BranchsModule],
  controllers: [SendMailController],
  providers: [SendMailService]
})
export class SendMailModule { }
