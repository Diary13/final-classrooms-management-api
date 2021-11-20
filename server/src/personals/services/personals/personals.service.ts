import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonalsDto } from 'src/dto/create/create-personals.dto';
import { PersonalDocument, Personals } from 'src/personals/personals.model';

@Injectable()
export class PersonalsService {

    constructor(@InjectModel(Personals.name) private readonly personalModel: Model<PersonalDocument>) { }

    public create(createPersonal: CreatePersonalsDto) {
        try {
            const newPersonal = new this.personalModel(createPersonal);
            return newPersonal.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    public async findAll() {
        try {
            return await this.personalModel.find();
        } catch (error) {
            throw new NotFoundException();
        }
    }

}
