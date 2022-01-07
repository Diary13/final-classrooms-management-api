import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchDocument, Branchs } from 'src/branchs/branchs.model';
import { CreateEDTDto } from 'src/dto/create/create-EDT.dto';
import { EDT, EDTDocument } from 'src/edt/edt.model';

@Injectable()
export class EdtService {
    constructor(@InjectModel(EDT.name) private EDTModel: Model<EDTDocument>, @InjectModel(Branchs.name) private branchModel: Model<BranchDocument>) { }

    public create(createEDT: CreateEDTDto) {
        try {
            const newEDT = new this.EDTModel(createEDT);
            return newEDT.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    public async findAll() {
        try {
            return await this.EDTModel.find().populate('branch');
        } catch (error) {
            throw new NotFoundException();
        }
    }

    public async findOne(edt_id: string) {
        try {
            return await this.EDTModel.findOne({ _id: edt_id }).populate('branch');
            // return await (await this.EDTModel.findOne({ _id: edt_id })).populate('branch');
        } catch (error) {
            throw new NotFoundException();
        }
    }

    public async findByBranchName(branch: string) {
        try {
            const branchFound = await this.branchModel.findOne({ name: branch });
            if (branchFound)
                return await this.EDTModel.findOne({ branch: branchFound._id.toString() }).populate('branch');
            else
                throw new NotFoundException()
        } catch (error) {
            throw new NotFoundException()
        }
    }

    public async update(EDT_id: string, newEDT: CreateEDTDto) {
        try {
            return await this.EDTModel.updateOne({ _id: EDT_id }, {
                M: newEDT.M,
                T: newEDT.T,
                W: newEDT.W,
                H: newEDT.H,
                F: newEDT.F,
                S: newEDT.S,
                branch: newEDT.branch
            });
        } catch (error) {
            throw new NotFoundException();
        }
    }

    public async delete(EDT_id: string) {
        try {
            return await this.EDTModel.deleteOne({ _id: EDT_id });
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
