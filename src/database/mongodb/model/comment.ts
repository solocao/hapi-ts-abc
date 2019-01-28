import { Document, Schema, Model, model } from "mongoose";
import paginate from "mongoose-paginate";


export interface IComment extends Document {
  content: string,
  user: any,
  post: any,
  child: [any],
  createdAt: Date,
  updatedAt: Date,
}

export const Comment = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  child: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date },
  updatedAt: { type: Date }
})


Comment.plugin(paginate);

export default model<IComment>("Comment", Comment);