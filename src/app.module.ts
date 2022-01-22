/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchsModule } from './branchs/branchs.module';
import { EdtModule } from './edt/edt.module';
import { PersonalsModule } from './personals/personals.module';
import { RoomsModule } from './rooms/rooms.module';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subjects/subjects.module';
import { MulterModule } from '@nestjs/platform-express';
import { DepartmentController } from './department/controllers/department/department.controller';
import { SendMailModule } from './send-mail/send-mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    StudentsModule,
    MulterModule.register({
      dest: './uploads'
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/rooms_gestion'),
    BranchsModule,
    EdtModule,
    PersonalsModule,
    RoomsModule,
    SubjectsModule,
    SendMailModule
  ],
  controllers: [AppController, DepartmentController],
  providers: [AppService],
})
export class AppModule { }
