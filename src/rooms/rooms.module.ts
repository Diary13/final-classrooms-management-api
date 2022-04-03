import { Module } from '@nestjs/common';
import { RoomsService } from './services/rooms/rooms.service';
import { RoomsController } from './controllers/rooms/rooms.controller';
import { Rooms, RoomSchema } from './rooms.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Rooms.name, schema: RoomSchema }])],
  exports: [MongooseModule, RoomsService],
  providers: [RoomsService],
  controllers: [RoomsController]
})
export class RoomsModule { }
