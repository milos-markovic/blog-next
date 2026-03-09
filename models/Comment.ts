// models/Comment.ts

import mongoose from "mongoose";
import { postType } from "./Post";
const { Schema } = mongoose;

const commentSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  status: { type: Boolean, default: false },
  post: { type: mongoose.Types.ObjectId, require: true, ref: "Post" },
  parent: { type: mongoose.Types.ObjectId, ref: "Comment", default: null },
});

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export type CommentType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  text: string;
  status: boolean;
  post: postType;
  parent: mongoose.Types.ObjectId;
};
