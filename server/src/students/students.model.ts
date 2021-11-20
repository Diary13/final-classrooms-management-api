import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as Mongoose from "mongoose";
import { Branchs } from "src/branchs/branchs.model";
export type StudentDocument = Document & Students;

@Schema()
export class Students {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    mail: string;
    @Prop({ required: false })
    photo?: string;
    @Prop({ required: true, ref: Branchs.name, type: Mongoose.Types.ObjectId })
    branch: string;
}

export const StudentSchema = SchemaFactory.createForClass(Students);