/* eslint-disable prettier/prettier */
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
import { StudentDocument, Students } from 'src/students/students.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PersonalsService {

    private admin = {
        name: '',
        mail: '',
        password: '',
        photo: '',
        isAdmin: true,
        post: 'admin'
    };

    constructor(
        private config: ConfigService,
        @InjectModel(Personals.name) private readonly personalModel: Model<PersonalDocument>,
        @InjectModel(Students.name) private readonly studentModel: Model<StudentDocument>
    ) {
        this.admin.name = this.config.get('NAME');
        this.admin.mail = this.config.get('MAIL');
        this.admin.password = this.config.get('PASSWORD');
    }

    public async login(loginDto: LoginDto) {
        try {
            var client;
            let personal = await this.personalModel.findOne({ mail: loginDto.mail });
            let student = await this.studentModel.findOne({ mail: loginDto.mail });
            if (loginDto.mail == this.admin.mail && loginDto.password == this.admin.password) {
                return {
                    token: jwt.sign({
                        id: 'admin',
                        name: this.admin.name,
                        mail: this.admin.mail,
                        photo: this.admin.photo,
                        access: 'admin'
                    }, environement.KEY)
                }
            }
            if (!personal) {
                if (!student)
                    throw new NotFoundException();
                else {
                    student = JSON.parse(JSON.stringify(student));
                    client = { ...student, access: 'student' }
                }
            } else {
                personal = JSON.parse(JSON.stringify(personal));
                client = (personal.isAdmin == true) ? { ...personal, access: 'admin' } : { ...personal, access: 'prof' };
            }
            if (!bcrypt.compareSync(loginDto.password, client.password))
                throw new NotFoundException();
            return {
                token: jwt.sign({
                    id: client._id,
                    name: client.name,
                    mail: client.mail,
                    photo: client.photo,
                    access: client.access
                }, environement.KEY)
            }
        } catch (error) {
            throw error;
        }
    }

    public create(createPersonal: CreatePersonalsDto) {
        try {
            createPersonal.password = bcrypt.hashSync(createPersonal.password, 5);
            const newPersonal = new this.personalModel(createPersonal);
            return newPersonal.save();
        } catch (error) {
            console.log("error service:");
            console.log(error);
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

    public async findOne(personal_id: string) {
        try {
            return await this.personalModel.findOne({ _id: personal_id });
        } catch (error) {
            throw new NotFoundException();
        }
    }

    public async update(personal_id: string, newPersonal: UpdatePersonalsDto) {
        try {
            const tmp = bcrypt.hashSync(newPersonal.password, 5);
            return await this.personalModel.updateOne({ _id: personal_id }, {
                name: newPersonal.name,
                mail: newPersonal.mail,
                password: tmp,
                photo: newPersonal.photo,
                isAdmin: newPersonal.isAdmin,
                post: newPersonal.post
            });
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
