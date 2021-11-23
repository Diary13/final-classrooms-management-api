import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentsDto } from 'src/dto/create/create-students.dto';
import { UpdateStudentDto } from 'src/dto/update/update-student.dto';
import { StudentsService } from 'src/students/services/students/students.service';

@Controller('students')
export class StudentsController {

    constructor(private studentService: StudentsService) { }

    @Post()
    public create(@Body() createStudent: CreateStudentsDto) {
        try {
            return this.studentService.create(createStudent);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Get('/all')
    public findAll() {
        try {
            return this.studentService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    public findOne(@Param('id') id: string) {
        try {
            return this.studentService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Put('/update/:id')
    public update(@Param('id') id: string, @Body() newStudent: UpdateStudentDto) {
        try {
            return this.studentService.update(id, newStudent);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/one/:id')
    public delete(@Param('id') id: string) {
        try {
            return this.studentService.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
