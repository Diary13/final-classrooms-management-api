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
            return await this.EDTModel.findOne({ _id: edt_id });
        } catch (error) {
            throw new NotFoundException();
        }
    }

    public async findByBranchName(branchName: string) {
        try {
            const branchFound = await this.branchModel.findOne({ name: branchName });
            if (branchFound) {
                const result = await this.EDTModel.find().populate('branch');
                for (let i = 0; i < result.length; i++) {
                    if (result[i]['branch']['_id'].toString() == branchFound._id.toString())
                        return result[i];
                }
            }
            else
                throw new NotFoundException();
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

    public async test() {
        try {
            return await this.EDTModel.find().populate('branch').sort({ branch: -1 });//desc,asc,1,-1
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
