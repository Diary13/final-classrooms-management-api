import { Module } from '@nestjs/common';
import { StudentsService } from './services/students/students.service';
import { StudentsController } from './controllers/students/students.controller';
import { Students, StudentSchema } from './students.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Students.name, schema: StudentSchema }])],
  exports: [MongooseModule, StudentsService],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule { }
