import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EDT, EDTDocument } from 'src/edt/edt.model';
import { RoomDocument, Rooms } from 'src/rooms/rooms.model';
import { ClassroomsUtils } from 'src/utils/classrooms.utils';

@Injectable()
export class SendMailService {

    private classroomUtils;
    private edt_hours = [];
    private edt;

    constructor(@InjectModel(Rooms.name) private roomModel: Model<RoomDocument>, @InjectModel(EDT.name) private edtModel: Model<EDTDocument>) {
        this.getAllEDT();
    }
    async getAllEDT() {
        this.edt = await this.edtModel.find().populate('branch');
        console.log(this.edt);
    }
    // public async getEDT(day: string, hour: string,) {
    //     try {
    //         for (let i = 0; i < this.edt.length; i++) {
    //             if (day == 'M') {
    //                 switch (hour) {
    //                     case 'h1':
    //                         if (this.edt[i].M.h1.subject != '') {
    //                             let tmp = {
    //                                 branch: 
    //                             }
    //                         }
    //                 }
    //             }



    //         }

    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public async sendMail() {
        try {

            // this.classroomUtils = new ClassroomsUtils();
            // let rooms = await this.roomModel.find();
            // //triage des capacités des salles de classe par ordre croissant
            // rooms.sort((a, b) => {
            //     return a.place_nb - b.place_nb;
            // })
            // //*************** */
            // this.classroomUtils.generate_classroom(rooms);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
