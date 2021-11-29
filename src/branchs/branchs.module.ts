import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Branchs, BranchSchema } from './branchs.model';
import { BranchsController } from './controllers/branchs/branchs.controller';
import { BranchsService } from './services/branchs/branchs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Branchs.name, schema: BranchSchema }])],
  controllers: [BranchsController],
  providers: [BranchsService]
})
export class BranchsModule {}
