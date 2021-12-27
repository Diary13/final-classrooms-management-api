import { Module } from '@nestjs/common';
import { EdtService } from './services/edt/edt.service';
import { EdtController } from './controllers/edt/edt.controller';
import { EDT, EDTSchema } from './edt.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: EDT.name, schema: EDTSchema }])],
  exports: [MongooseModule, EdtService],
  providers: [EdtService],
  controllers: [EdtController]
})
export class EdtModule { }
