import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchDocument, Branchs } from 'src/branchs/branchs.model';
import { BranchsService } from 'src/branchs/services/branchs/branchs.service';
import { CreateEDTDto } from 'src/dto/create/create-EDT.dto';
import { EDT, EDTDocument } from 'src/edt/edt.model';
import { EdtService } from 'src/edt/services/edt/edt.service';
import { RoomDocument, Rooms } from 'src/rooms/rooms.model';
import { ClassroomsUtils } from 'src/utils/classrooms.utils';

@Injectable()
export class SendMailService {

    private classroomUtils;
    private edt;

    constructor(
        private EDTService: EdtService, private branchService: BranchsService,
        @InjectModel(Rooms.name) private roomModel: Model<RoomDocument>,
        @InjectModel(Branchs.name) private branchModel: Model<BranchDocument>
    ) {
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
                                subject: {
                                    name: tmp_edt[i][day][hour].subject,
                                    prof: tmp_edt[i][day][hour].prof
                                },
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
                                subject: {
                                    name: tmp_edt[i][day][hour].subject,
                                    prof: tmp_edt[i][day][hour].prof
                                },
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
            const edt_updated = await this.update_each_edt();
            if (edt_updated == true) {
                const branchs = await this.branchService.findAll();
                for (let i = 0; i < branchs.length; i++) {
                    let edt_branch = await this.EDTService.findByBranchName(branchs[i].name);
                }
                return branchs;
            } else
                return new InternalServerErrorException();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    public async distribute_Classrooms(day: string, hour: string) {
        try {
            this.classroomUtils = new ClassroomsUtils();
            let rooms = await this.roomModel.find();
            //triage des capacités des salles de classe par ordre croissant
            rooms.sort((a, b) => {
                return a.place_nb - b.place_nb;
            })
            const branch = await this.getEDT(day, hour);
            branch.sort((a, b) => {
                return a.effectif - b.effectif;
            })

            const result = await this.classroomUtils.generate(rooms, branch);

            for (let k = 0; k < result.length; k++) {
                let branch_edt;//debug
                if (result[k].branch.name.length > 1) {
                    for (let i = 0; i < result[k].branch.name.length; i++) {
                        let tmp_branch_name = [...result[k].branch.name];

                        branch_edt = await this.EDTService.findByBranchName(result[k].branch.name[i]);
                        tmp_branch_name.splice(i, 1);
                        branch_edt[day][hour] = {
                            subject: result[k].subject.name,
                            prof: result[k].subject.prof,
                            other_class: tmp_branch_name,
                            room: result[k].room.name
                        }
                        await this.EDTService.update(branch_edt._id, branch_edt);
                    }
                } else {
                    branch_edt = await this.EDTService.findByBranchName(result[k].branch.name[0]);
                    branch_edt[day][hour] = {
                        subject: result[k].subject.name,
                        prof: result[k].subject.prof,
                        other_class: [],
                        room: result[k].room.name
                    }
                    await this.EDTService.update(branch_edt._id, branch_edt);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async update_each_edt() {
        try {
            let day = ['M', 'T', 'W', 'H', 'F', 'S'];
            let hour = ['h1', 'h2', 'h3', 'h4'];
            for (let i = 0; i < 6; i++) {
                if (i != 5) {
                    for (let j = 0; j < 4; j++)
                        await this.distribute_Classrooms(day[i], hour[j]);
                } else {
                    for (let j = 0; j < 2; j++)
                        await this.distribute_Classrooms(day[i], hour[j]);
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}