import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { CreatePersonalsDto } from 'src/dto/create/create-personals.dto';
import { PersonalsService } from 'src/personals/services/personals/personals.service';

@Controller('personals')
export class PersonalsController {

    constructor(private personalService: PersonalsService) { }

    @Post()
    public create(@Body() createPersonal: CreatePersonalsDto) {
        try {
            return this.personalService.create(createPersonal);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
