/* eslint-disable prettier/prettier */
import { Post, Body, Delete, Patch, Param, Controller, Get, InternalServerErrorException, Put } from '@nestjs/common';
import { CreateSubjectsDto } from 'src/dto/create/create-subject.dto';
import { UpdateSubjectsDto } from 'src/dto/update/update-subjects.dto';
import { SubjectsService } from 'src/subjects/services/subjects/subjects.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {

    constructor(private readonly subjectService: SubjectsService) { }

    @Post()
    public create(@Body() createSubjects: CreateSubjectsDto) {
        try {
            return this.subjectService.create(createSubjects);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Get('/all')
    public findAll() {
        try {
            return this.subjectService.findAll()
        } catch (error) {
            throw error;
        }
    }

    @Get('/:branch/all')
    public findByBranchName(@Param('branch') branch: string) {
        try {
            return this.subjectService.findByBranchName(branch);
        } catch (error) {
            throw error;
        }
    }

    @Put('/update/:id')
    public update(@Param('id') id: string, @Body() newSub: UpdateSubjectsDto) {
        try {
            return this.subjectService.update(id, newSub);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/one/:id')
    public delete(@Param('id') id: string) {
        try {
            return this.subjectService.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

