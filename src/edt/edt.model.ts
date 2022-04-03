import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as Mongoose from "mongoose";
import { Branchs } from "src/branchs/branchs.model";
import { dayEDT } from "src/dto/create/create-EDT.dto";

export type EDTDocument = Document & EDT;

@Schema()
export class EDT {
    @Prop({ required: false })
    M: dayEDT;
    @Prop({ required: false })
    T: dayEDT;
    @Prop({ required: false })
    W: dayEDT;
    @Prop({ required: false })
    H: dayEDT;
    @Prop({ required: false })
    F: dayEDT;
    @Prop({ required: false })
    S: dayEDT;
    @Prop({ required: true, ref: Branchs.name, type: Mongoose.Types.ObjectId })
    branch: string;
}

export const EDTSchema = SchemaFactory.createForClass(EDT);