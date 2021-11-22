/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as Mongoose  from "mongoose";
import { Personals } from "src/personals/personals.model";

export type SubjectDocument = Document & Subjects;

@Schema()
export class Subjects {
    @Prop({ required: true })
    name: string;
    @Prop({ required:true, ref: Personals.name, type: Mongoose.Types.ObjectId })
    prof:string;
    @Prop({ required: true })
    branch: string;
}

export const SubjectsSchema = SchemaFactory.createForClass(Subjects);