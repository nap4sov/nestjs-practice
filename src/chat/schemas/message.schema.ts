import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Message {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  nickname: string;

  @Prop()
  avatar: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
