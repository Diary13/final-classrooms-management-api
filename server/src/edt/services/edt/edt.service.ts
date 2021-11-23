import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEDTDto } from 'src/dto/create/create-EDT.dto';
import { EDT, EDTDocument } from 'src/edt/edt.model';

@Injectable()
export class EdtService {
    constructor(@InjectModel(EDT.name) private EDTModel: Model<EDTDocument>) { }

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
            return await this.EDTModel.find();
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

    public async update(EDT_id: string, newEDT: CreateEDTDto) {
        try {
            return await this.EDTModel.updateOne({ _id: EDT_id }, {
                M: newEDT.M,
                T: newEDT.T,
                W: newEDT.W,
                H: newEDT.H,
                F: newEDT.F,
                S: newEDT.S
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
