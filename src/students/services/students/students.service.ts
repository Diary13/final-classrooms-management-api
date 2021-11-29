import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentsDto } from 'src/dto/create/create-students.dto';
import { UpdateStudentDto } from 'src/dto/update/update-student.dto';
import { StudentDocument, Students } from 'src/students/students.model';

@Injectable()
export class StudentsService {

    constructor(@InjectModel(Students.name) private studentsModel: Model<StudentDocument>) { }

    public create(createStudent: CreateStudentsDto) {
        try {
            const newStudent = new this.studentsModel(createStudent);
            return newStudent.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    public async findAll() {
        try {
            return await this.studentsModel.find();
        } catch (error) {
            throw new NotFoundException();
        }
    }

    public async findOne(student_id: string) {
        try {
            return await this.studentsModel.findOne({ _id: student_id });
        } catch (error) {
            throw new NotFoundException();
        }
    }

    public async update(student_id: string, newStudent: UpdateStudentDto) {
        try {
            return await this.studentsModel.updateOne({ _id: student_id }, {
                name: newStudent.name,
                mail: newStudent.mail,
                photo: newStudent.photo,
                branch: newStudent.branch
            });
        } catch (error) {
            throw new NotFoundException();
        }
    }

    public async delete(student_id: string) {
        try {
            return await this.studentsModel.deleteOne({ _id: student_id });
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
