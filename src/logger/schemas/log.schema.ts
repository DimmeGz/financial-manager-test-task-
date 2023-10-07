import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Action } from 'src/interfaces';

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {
  @Prop()
  action: Action;

  @Prop()
  paymentType: string;

  @Prop()
  paymentDate: Date;

  @Prop()
  category: string;

  @Prop()
  amount: string;

  @Prop()
  created_at: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
