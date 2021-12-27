import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMailService } from 'src/send-mail/services/send-mail/send-mail.service';

@ApiTags('Send-mail')
@Controller('send-mail')
export class SendMailController {

    constructor(private sendMailService: SendMailService) {

    }

    @Post()
    public sendMail() {
        try {
            this.sendMailService.sendMail();
        } catch (error) {

        }
    }
}
