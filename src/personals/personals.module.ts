import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from 'src/students/controllers/students/students.controller';
import { StudentsService } from 'src/students/services/students/students.service';
import { StudentsModule } from 'src/students/students.module';
import { PersonalsController } from './controllers/personals/personals.controller';
import { Personals, PersonalSchema } from './personals.model';
import { PersonalsService } from './services/personals/personals.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Personals.name, schema: PersonalSchema }]), StudentsModule],
  controllers: [PersonalsController],
  providers: [PersonalsService]
})
export class PersonalsModule { }
