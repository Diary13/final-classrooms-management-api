/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchDocument, Branchs } from 'src/branchs/branchs.model';
import { CreateBranchsDto } from 'src/dto/create/create-branchs.dto';
import { UpdateBranchDto } from 'src/dto/update/update-branch.dto';
import { ClassroomsUtils } from 'src/utils/classrooms.utils';

@Injectable()
export class BranchsService {

    constructor(@InjectModel(Branchs.name) private readonly branchModel: Model<BranchDocument>) { }

    public async create(branch: CreateBranchsDto) {
        try {
            const b = new this.branchModel(branch);
            return b.save();
        } catch (error) {
            console.log(error);

            throw new InternalServerErrorException();
        }
    }

    public async findAll(): Promise<any> {
        try {
            return await this.branchModel.find();
        } catch (error) {
            return new NotFoundException();
        }
    }
    public async findAllByDepartment(department: string): Promise<any> {
        try {
            return await this.branchModel.find({ department: department });
        } catch (error) {
            return new NotFoundException();
        }
    }
    public async update(branch_id: string, newBranch: UpdateBranchDto) {
        try {
            return await this.branchModel.updateOne({ _id: branch_id }, {
                name: newBranch.name,
                effectif: newBranch.effectif,
                department: newBranch.department
            });
        }
        catch (error) {
            throw error;
        }
    }
    public async delete(branch_id: string) {
        try {
            return await this.branchModel.deleteOne({ _id: branch_id });
        }
        catch (error) {
            throw error;
        }

    }
}
