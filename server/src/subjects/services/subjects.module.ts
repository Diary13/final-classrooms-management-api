/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { SubjectsController } from '../controllers/subjects/subjects.controller';
import { Subjects, SubjectsSchema } from "../subjects.model";
import { SubjectsService } from './subjects.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subjects.name, schema: SubjectsSchema }])],
  providers: [ SubjectsService ],
  controllers: [ SubjectsController ] 
})

export class SubjectsModule{}