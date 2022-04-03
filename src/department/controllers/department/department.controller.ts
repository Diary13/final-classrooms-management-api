import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from 'src/dto/create/create-department.dto';
import * as department from '../../../assets/department.json';
import * as fs from 'fs';

@ApiTags('department')
@Controller('department')
export class DepartmentController {

    @Post()
    @ApiBody({ type: CreateDepartmentDto })
    // @ApiConsumes('multipart/form-data')
    public create(@Body() newDepartment: CreateDepartmentDto) {
        try {
            department.push(newDepartment);
            fs.writeFileSync('src/assets/department.json', JSON.stringify(department));
            return department;
        } catch (error) {
            throw error;
        }
    }

    @Get('all')
    public async findAll() {
        try {
            return await department;
        } catch (error) {
            throw error;
        }
    }
}
