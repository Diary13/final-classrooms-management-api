import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as Mongoose from "mongoose";
import { Rooms } from "src/rooms/rooms.model";

export type PersonalDocument = Document & Personals;

@Schema()
export class Personals {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    mail: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: false })
    photo?: string;
    @Prop({ required: true })
    isAdmin: boolean;//admin ou ...
    @Prop({ required: true })
    post: string;// prof ou ...
}

export const PersonalSchema = SchemaFactory.createForClass(Personals);