/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subjects } from '../../subjects.model';
import { Model } from 'mongoose';
import { SubjectDocument } from 'src/subjects/subjects.model';
import { CreateSubjectsDto } from 'src/dto/create/create-subject.dto';
import { UpdateSubjectsDto } from 'src/dto/update/update-subjects.dto';

@Injectable()
export class SubjectsService {

    constructor(@InjectModel(Subjects.name) private readonly subjectModel: Model<SubjectDocument>) { }

    //Create
    public create(createSubjects: CreateSubjectsDto) {
        try {
            const newSub = new this.subjectModel(createSubjects);
            return newSub.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    //Read
    public async findAll() {
        try {
            return await this.subjectModel.find();
        } catch (error) {
            throw new NotFoundException();
        }
    }

    //Update
    public async update(subjectsId: string, newSub: UpdateSubjectsDto) {
        try {
            return await this.subjectModel.updateOne({ _id: subjectsId },
                {
                    name: newSub.name,
                    prof: newSub.prof,
                    branch: newSub.branch
                }
            );
        } catch (error) {
            throw new NotFoundException();
        }
    }

    //Delete

    public async delete(subjectsId: string) {
        try {
            return await this.subjectModel.deleteOne({ _id: subjectsId });
        } catch (error) {
            throw new NotFoundException()
        }
    }

}
