import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateRoomsDto } from 'src/dto/create/create-room.dto';
import { RoomsService } from 'src/rooms/services/rooms/rooms.service';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateRoomsDto } from 'src/dto/update/update-rooms.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomService: RoomsService) { }

    @Post()
    public create(@Body() createRooms: CreateRoomsDto) {
        try {
            return this.roomService.create(createRooms);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Get('/all')
    public findAll() {
        try {
            return this.roomService.findAll()
        } catch (error) {
            throw error;
        }
    }

    @Put('/update/:id')
    public update(@Param('id') id: string, @Body() newRoom: UpdateRoomsDto) {
        try {
            return this.roomService.update(id, newRoom);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/one/:id')
    public delete(@Param('id') id: string) {
        try {
            return this.roomService.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
