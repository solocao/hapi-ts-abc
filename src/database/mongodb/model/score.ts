import { Document, Schema, Model, model } from "mongoose";

export interface IScore extends Document {
  value: number,
  month: string,
  user: any
}

export const Score: Schema = new Schema({
  value: { type: Number, required: true },
  month: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model<IScore>("Score", Score);