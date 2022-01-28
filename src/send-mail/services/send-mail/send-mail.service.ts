import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchDocument, Branchs } from 'src/branchs/branchs.model';
import { BranchsService } from 'src/branchs/services/branchs/branchs.service';
import { StudentsService } from 'src/students/services/students/students.service';
import { EdtService } from 'src/edt/services/edt/edt.service';
import { RoomDocument, Rooms } from 'src/rooms/rooms.model';
import { ClassroomsUtils } from 'src/utils/classrooms.utils';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailService {

    private classroomUtils;
    private edt;

    constructor(
        private mailerService: MailerService,
        private EDTService: EdtService,
        private branchService: BranchsService,
        private studentService: StudentsService,
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
            let tmp_edt = [...this.edt];
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

    async sendMailToUser(user: any, edt: any, d: any) {
        await this.mailerService.sendMail({
            to: user.mail,
            subject: 'EMPLOI DU TEMPS ' + edt.branch.name,
            template: '../edt',
            context: {
                update: d.update,
                start_date: d.start_date,
                end_date: d.end_date,
                name: user.name,
                ...edt
            }
        });
    }

    public async sendMail(obj: any, update: boolean) {
        try {
            let obj_date = {
                update: update,
                ...obj
            }
            const edt_updated = await this.update_each_edt();
            if (edt_updated == true) {
                const branchs = await this.branchService.findAll();
                for (let i = 0; i < branchs.length; i++) {
                    let edt_branch = await this.EDTService.findByBranchName(branchs[i].name);
                    let students = await this.studentService.findAllByBranchName(branchs[i].name);
                    let tmp = JSON.stringify(edt_branch);
                    edt_branch = JSON.parse(tmp);
                    if (students.length > 0) {
                        for (let j = 0; j < students.length; j++) {
                            await this.sendMailToUser(students[j], edt_branch, obj_date);
                        }
                    }
                }
                return "MAIL SEND SUCCESSFULLY";
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
            let branch = await this.getEDT(day, hour);
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
            let days = ['M', 'T', 'W', 'H', 'F', 'S'];
            let hours = ['h1', 'h2', 'h3', 'h4'];

            for (let i = 0; i < 6; i++) {
                if (i != 5) {
                    for (let j = 0; j < 4; j++)
                        await this.distribute_Classrooms(days[i], hours[j]);
                } else {
                    for (let j = 0; j < 2; j++)
                        await this.distribute_Classrooms(days[i], hours[j]);
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}