import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as Mongoose from "mongoose";
export type EDTDocument = Document & Rooms;

@Schema()
export class Rooms {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    batiment: number;
    @Prop({ required: true, default: 0 })
    niveau: number;
    @Prop({ required: true, default: 0 })
    place_nb: number;
}

export const RoomSchema = SchemaFactory.createForClass(Rooms);