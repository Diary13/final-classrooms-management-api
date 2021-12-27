import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as Mongoose from "mongoose";
import { EDT } from "src/edt/edt.model";

export type BranchDocument = Document & Branchs;

@Schema()
export class Branchs {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true, default: 0 })
    effectif: number;
    @Prop({ required: true })
    department: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branchs);