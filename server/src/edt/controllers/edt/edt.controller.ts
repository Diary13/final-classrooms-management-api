import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateEDTDto } from 'src/dto/create/create-EDT.dto';
import { EdtService } from 'src/edt/services/edt/edt.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('EDT')
@Controller('edt')
export class EdtController {

    constructor(private EDTService: EdtService) { }

    @Post()
    public create(@Body() createEDT: CreateEDTDto) {
        try {
            return this.EDTService.create(createEDT);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Get('/all')
    public findAll() {
        try {
            return this.EDTService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    public findOne(@Param('id') id: string) {
        try {
            return this.EDTService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Put('/update/:id')
    public update(@Param('id') id: string, @Body() newEDT: CreateEDTDto) {
        try {
            return this.EDTService.update(id, newEDT);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/one/:id')
    public delete(@Param('id') id: string) {
        try {
            return this.EDTService.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
