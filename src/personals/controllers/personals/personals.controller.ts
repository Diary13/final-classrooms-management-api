import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePersonalsDto } from 'src/dto/create/create-personals.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UpdatePersonalsDto } from 'src/dto/update/update-personals.dto';
import { PersonalsService } from 'src/personals/services/personals/personals.service';
import { ApiConsumes, ApiTags, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@ApiTags('personals')
@Controller('personals')
export class PersonalsController {

    constructor(private personalService: PersonalsService) { }

    @Post('/login')
    public login(@Body() logindto: LoginDto) {
        try {
            return this.personalService.login(logindto);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    @ApiBody({ type: CreatePersonalsDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('photo', {
        dest: './uploads'
    }))
    public create(@UploadedFile() photo, @Body() createPersonal: CreatePersonalsDto) {
        try {
            if (photo) {
                const data = { path: 'uploads/' + Date.now() + '_' + photo.originalname }
                fs.renameSync('uploads/' + photo.filename, data.path)
                return this.personalService.create({ ...createPersonal, photo: data.path });
            } else {
                const path = (createPersonal.isAdmin.toString() == 'true') ? 'uploads/admin.png' : 'uploads/client.png';
                return this.personalService.create({ ...createPersonal, photo: path });
            }
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Get('/all')
    public findAll() {
        try {
            return this.personalService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    public findOne(@Param('id') id: string) {
        try {
            return this.personalService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Put('/update/:id')
    @ApiBody({ type: UpdatePersonalsDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('photo', {
        dest: './uploads'
    }))
    public async update(@Param('id') id: string, @UploadedFile() photo, @Body() newPersonal: UpdatePersonalsDto) {
        try {
            if (photo) {
                const data = { path: 'uploads/' + Date.now() + '_' + photo.originalname };
                fs.renameSync('uploads/' + photo.filename, data.path);
                newPersonal.photo = data.path;
            } else {
                await this.personalService.findOne(id).then((res) => {
                    newPersonal.photo = res.photo;
                });
            }
            return this.personalService.update(id, newPersonal);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/one/:id')
    public delete(@Param('id') id: string) {
        try {
            return this.personalService.delete(id);
        } catch (error) {
            throw error;
        }
    }
}