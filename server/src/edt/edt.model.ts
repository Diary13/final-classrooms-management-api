import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as Mongoose from "mongoose";
import { Rooms } from "src/rooms/rooms.model";

export type EDTDocument = Document & EDT;

@Schema()
export class EDT {
    @Prop({ required: true })
    day: number;
    @Prop({ required: true })
    hours: number;
    @Prop({ required: false })
    subject: string;
    @Prop({ required: true, ref: Rooms.name, type: Mongoose.Types.ObjectId })
    room: string;
}

export const EDTSchema = SchemaFactory.createForClass(EDT);