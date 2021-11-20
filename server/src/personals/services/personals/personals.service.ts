import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonalsDto } from 'src/dto/create/create-personals.dto';
import { PersonalDocument, Personals } from 'src/personals/personals.model';

@Injectable()
export class PersonalsService {

    constructor(@InjectModel(Personals.name) private createPersonal: Model<PersonalDocument>) { }

    public create(createPersonal: CreatePersonalsDto) {
        try {
            const newPersonal = new this.createPersonal(createPersonal);
            return newPersonal.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

}
