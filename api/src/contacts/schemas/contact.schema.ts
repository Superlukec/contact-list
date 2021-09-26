import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop()
  name: string;

  @Prop()
  gender: number;

  @Prop()
  email: string;

  @Prop()
  telephone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);