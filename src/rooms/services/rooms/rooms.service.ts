import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomsDto } from 'src/dto/create/create-room.dto';
import { UpdateRoomsDto } from 'src/dto/update/update-rooms.dto';
import { Rooms } from 'src/rooms/rooms.model';
import { RoomDocument } from 'src/rooms/rooms.model';

@Injectable()
export class RoomsService {

    constructor(@InjectModel(Rooms.name) private readonly roomModel: Model<RoomDocument>) {}

   //Create
   public create(CreateRooms: CreateRoomsDto) {
    try {
        const newRoom = new this.roomModel(CreateRooms);
        return newRoom.save();
    } catch (error) {
        throw new InternalServerErrorException();
    }
}

    //Read
    public async findAll(){
        try {
            return await this.roomModel.find();
        } catch (error) {
            throw new NotFoundException();
        }
    }

    //Update
    public async update(roomsId: string, newRoom: UpdateRoomsDto){
    try {
        return await this.roomModel.updateOne({ _id: roomsId },
            {
                name: newRoom.name,
                batiment: newRoom.batiment,
                niveau: newRoom.niveau,
                place_nb: newRoom.place_nb
            }
            );
    } catch (error) {
        throw new NotFoundException();
    }  
    }

    //Delete

    public async delete(roomsId: string){
        try {
            return await this.roomModel.deleteOne({ _id: roomsId});
        } catch (error) {
            throw new NotFoundException()
        }
    }

}
