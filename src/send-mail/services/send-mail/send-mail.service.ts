import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchsService } from 'src/branchs/services/branchs/branchs.service';
import { EDT, EDTDocument } from 'src/edt/edt.model';
import { EdtService } from 'src/edt/services/edt/edt.service';
import { RoomDocument, Rooms } from 'src/rooms/rooms.model';
import { ClassroomsUtils } from 'src/utils/classrooms.utils';

@Injectable()
export class SendMailService {

    private classroomUtils;
    private edt;

    constructor(private EDTService: EdtService, private branchService: BranchsService, @InjectModel(Rooms.name) private roomModel: Model<RoomDocument>, @InjectModel(EDT.name) private edtModel: Model<EDTDocument>) {
        this.getAllEDT();

    }
    async getAllEDT() {
        // this.edt = await this.edtModel.find().populate('branch');//or ['branch', 'prof']
        this.edt = await this.EDTService.findAll();
    }
    public async getEDT(day: string, hour: string,) {
        try {
            let tmp_edt = this.edt;
            let edt_hours = [];

            for (let i = 0; i < tmp_edt.length; i++) {
                if (tmp_edt[i] != undefined) {
                    if (tmp_edt[i][day][hour].subject != '') {
                        if (tmp_edt[i][day][hour].other_class == null) {
                            edt_hours.push({
                                branch_name: [tmp_edt[i].branch.name],
                                effectif: tmp_edt[i].branch.effectif
                            });
                        } else {
                            let effectif = tmp_edt[i].branch.effectif;
                            let branch_name = [tmp_edt[i].branch.name];
                            for (let j = 0; j < tmp_edt[i][day][hour].other_class.length; j++) {
                                let tmp_branch = await this.branchService.findByName(tmp_edt[i][day][hour].other_class[j]);
                                tmp_edt.map((value, index, array) => {
                                    if (value.branch._id.toString() == tmp_branch._id.toString())
                                        delete array[index];
                                })
                                effectif += tmp_branch.effectif;
                                branch_name.push(tmp_branch.name);
                            }
                            edt_hours.push({
                                branch_name: branch_name,
                                effectif: effectif
                            });
                        }
                    }
                }
            }
            return edt_hours;
        } catch (error) {
            throw error;
        }
    }

    public async sendMail() {
        try {
            this.classroomUtils = new ClassroomsUtils();
            const branch = await this.getEDT('M', 'h1');
            branch.sort((a, b) => {
                return a.effectif - b.effectif;
            })
            let rooms = await this.roomModel.find();
            //triage des capacités des salles de classe par ordre croissant
            rooms.sort((a, b) => {
                return a.place_nb - b.place_nb;
            })
            //triez rooms et branch

            const result = await this.classroomUtils.generate(rooms, branch);
            return result;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
