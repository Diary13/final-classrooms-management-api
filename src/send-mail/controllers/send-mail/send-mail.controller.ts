import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMailService } from 'src/send-mail/services/send-mail/send-mail.service';

@ApiTags('Send-mail')
@Controller('send-mail')
export class SendMailController {

    constructor(private sendMailService: SendMailService) {

    }

    @Post('/:update')
    public async sendMail(@Param('update') update: boolean) {
        try {
            let test = '' + update;
            update = (test == 'true') ? true : false;
            let obj = {
                start_date: "",
                end_date: ""
            }
            let d = new Date();
            d.setDate(d.getDate() + (6 - d.getDay() + 2));
            let d1 = new Date(d);
            d1.setDate(d.getDate() + 5);
            obj.start_date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            obj.end_date = d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();
            return await this.sendMailService.sendMail(obj, update);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
