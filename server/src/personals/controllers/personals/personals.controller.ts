import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Put } from '@nestjs/common';
import { CreatePersonalsDto } from 'src/dto/create/create-personals.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UpdatePersonalsDto } from 'src/dto/update/update-personals.dto';
import { PersonalsService } from 'src/personals/services/personals/personals.service';

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
    public create(@Body() createPersonal: CreatePersonalsDto) {
        try {
            return this.personalService.create(createPersonal);
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
    public update(@Param('id') id: string, @Body() newPersonal: UpdatePersonalsDto) {
        try {
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
