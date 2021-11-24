/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchDocument, Branchs } from 'src/branchs/branchs.model';
import { CreateBranchsDto } from 'src/dto/create/create-branchs.dto';

@Injectable()
export class BranchsService {

    constructor(@InjectModel(Branchs.name) private readonly branchModel: Model<BranchDocument>) {}

    public async create(branch: CreateBranchsDto) {
        try {
            // const user = await this.userModel.findOne({name: 'diary'}).exec();
            // console.log("USER:");
            // console.log(user);
            // branch.user = user;
            
            const b = new this.branchModel(branch);
            return b.save();
        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException();
        }
    }

    public async findAll(): Promise<any> {
        try {
            return await this.branchModel.find().populate('user');
        } catch (error) {
            console.log(error);
            return new NotFoundException();
        }
    }
}
