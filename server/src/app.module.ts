import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchsModule } from './branchs/branchs.module';
import { EdtModule } from './edt/edt.module';
import { PersonalsModule } from './personals/personals.module';
import { RoomsModule } from './rooms/rooms.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [StudentsModule, MongooseModule.forRoot('mongodb://localhost:27017/rooms_gestion'), BranchsModule, EdtModule, PersonalsModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
