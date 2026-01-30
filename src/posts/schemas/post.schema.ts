import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true, minlength: 3 })
  title: string;

  @Prop({ required: true, minlength: 10 })
  body: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: null })
  image: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);