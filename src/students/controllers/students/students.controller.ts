import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateStudentsDto } from 'src/dto/create/create-students.dto';
import { UpdateStudentDto } from 'src/dto/update/update-student.dto';
import { StudentsService } from 'src/students/services/students/students.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@ApiTags('students')
@Controller('students')
export class StudentsController {

    constructor(private studentService: StudentsService) { }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreateStudentsDto })
    @UseInterceptors(FileInterceptor('photo', {
        dest: './uploads'
    }))
    public create(@UploadedFile() photo, @Body() createStudent: CreateStudentsDto) {
        try {
            if (photo) {
                const data = { path: 'uploads/' + Date.now() + '_' + photo.originalname }
                fs.renameSync('uploads/' + photo.filename, data.path)
                return this.studentService.create({ ...createStudent, photo: data.path });
            } else {
                const path = 'uploads/client.png';
                return this.studentService.create({ ...createStudent, photo: path });
            }
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
    @ApiBody({ type: UpdateStudentDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('photo', {
        dest: './uploads'
    }))
    public async update(@Param('id') id: string, @UploadedFile() photo, @Body() newStudent: UpdateStudentDto) {
        try {
            if (photo) {
                const data = { path: 'uploads/' + Date.now() + '_' + photo.originalname };
                fs.renameSync('uploads/' + photo.filename, data.path);
                newStudent.photo = data.path;
            } else {
                await this.studentService.findOne(id).then((res) => {
                    newStudent.photo = res.photo
                });
            }
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
