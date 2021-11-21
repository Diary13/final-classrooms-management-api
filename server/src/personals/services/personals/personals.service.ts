import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreatePersonalsDto } from 'src/dto/create/create-personals.dto';
import { PersonalDocument, Personals } from 'src/personals/personals.model';
import { UpdatePersonalsDto } from 'src/dto/update/update-personals.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UsingJoinTableIsNotAllowedError } from 'typeorm';
import { environement } from 'src/environment';

@Injectable()
export class PersonalsService {

    constructor(@InjectModel(Personals.name) private readonly personalModel: Model<PersonalDocument>) { }

    public async login(loginDto: LoginDto) {
        try {
            const personal = await this.personalModel.findOne({ mail: loginDto.mail });
            if (!personal) throw new NotFoundException();
            if (!bcrypt.compareSync(loginDto.password, personal.password))
                throw new NotFoundException();
            return {
                token: jwt.sign({
                    id: personal._id,
                    name: personal.name,
                    mail: personal.mail,
                    photo: personal.photo
                }, environement.KEY)
            }
        } catch (error) {
            throw error;
        }
    }

    public create(createPersonal: CreatePersonalsDto) {
        try {
            if (createPersonal.isAdmin == true)
                createPersonal.password = bcrypt.hashSync(createPersonal.password, 5);
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

    public async update(personal_id: string, newPersonal: UpdatePersonalsDto) {
        try {
            if (newPersonal.isAdmin == true) {
                const tmp = bcrypt.hashSync(newPersonal.password, 5);
                return await this.personalModel.updateOne({ _id: personal_id }, {
                    name: newPersonal.name,
                    mail: newPersonal.mail,
                    password: tmp,
                    photo: newPersonal.photo,
                    isAdmin: true,
                    post: newPersonal.post
                });
            } else {
                return await this.personalModel.updateOne({ _id: personal_id }, {
                    name: newPersonal.name,
                    mail: newPersonal.mail,
                    password: '',
                    photo: newPersonal.photo,
                    isAdmin: false,
                    post: newPersonal.post
                });
            }
        } catch (error) {
            throw new NotFoundException();
        }
    }

    public async delete(personal_id: string) {
        try {
            return await this.personalModel.deleteOne({ _id: personal_id });
        } catch (error) {
            throw new NotFoundException();
        }
    }

}
