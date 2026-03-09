// models/Post.ts

import mongoose from "mongoose";
import { boolean } from "zod";
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  img: { type: String, required: false, default: "" },
  wrote: { type: mongoose.Types.ObjectId, ref: "User" },
  status: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export type postType = {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  img: string;
  wrote: mongoose.Types.ObjectId;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};
