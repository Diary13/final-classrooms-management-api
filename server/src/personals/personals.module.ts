import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalsController } from './controllers/personals/personals.controller';
import { Personals, PersonalSchema } from './personals.model';
import { PersonalsService } from './services/personals/personals.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Personals.name, schema: PersonalSchema }])],
  controllers: [PersonalsController],
  providers: [PersonalsService]
})
export class PersonalsModule { }
