import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  img: { type: String, default: null },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export type UserType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  active: boolean;
  img: string;
  role: "user" | "admin";
  updatedAt: Date;
};
