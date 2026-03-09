"use server";

import connectToDatabase from "@/db/connectDB";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import {
  signupSchema,
  loginSchema,
  profileSchema,
  formActionState,
  userCreateSchema,
  updateCreateSchema,
} from "@/lib/validate";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import { createSession, deleteSession } from "@/lib/session";
import { Post } from "@/models/Post";
import { Comment } from "@/models/Comment";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import { cryptPassword } from "@/lib/password";

export const SignUp = async (
  initialState: formActionState,
  formData: FormData
): Promise<formActionState> => {
  await connectToDatabase();

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  const parsedData = signupSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!parsedData.success) {
    console.log("signup validation faild");
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    const hashedPassword = await cryptPassword(parsedData.data.password);

    await User.create({
      name: parsedData.data.name,
      email: parsedData.data.email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (err) {
    console.log("Error signup user:", err);
    return { success: false };
  }
};

export const SignIn = async (
  initialState: formActionState,
  formData: FormData
): Promise<formActionState> => {
  await connectToDatabase();

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const parsedData = loginSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const findUser = await User.findOne({ email: email });

  if (findUser) {
    await createSession(findUser._id.toString());
    return { success: true };
  }

  return { success: false };
};

export async function logout() {
  await connectToDatabase();

  await deleteSession();
  redirect("/login");
}

export const getUser = async (id: object) => {
  await connectToDatabase();

  const userDoc = await User.findById(id).lean();

  if (userDoc) {
    const user = {
      ...userDoc,
      id: userDoc._id.toString(),
      _id: userDoc._id.toString(),
    };

    return user;
  } else {
    console.log("cant find user");
  }
};

export const getUsers = async () => {
  await connectToDatabase();

  try {
    const usersDoc = await User.find({}).lean();
    const users = usersDoc.map((user) => {
      return { ...user, _id: user._id.toString() };
    });

    return users;
  } catch (err) {
    console.log("fetch users error", err);
  }
};

const uploadFile = async (file: File) => {
  if (!file) {
    return;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "img/profile");

  const filename = `${file.name}`;
  const filepath = path.join(uploadDir, filename);

  await writeFile(filepath, buffer);

  return `/img/profile/${filename}`;
};

export const deleteImage = async (imgPath: string) => {
  try {
    const fullPath = path.join(process.cwd(), "public", imgPath);

    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      console.log("Image deleted:", fullPath);
    } else {
      console.log("Image not found:", fullPath);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

export const updateProfile = async (
  initialState: formActionState,
  formData: FormData
): Promise<formActionState> => {
  await connectToDatabase();

  const _id = formData.get("_id");
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const img = formData.get("img") as File;

  const parsedData = profileSchema.safeParse({
    name,
    email,
    password,
  });

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  let data: { name: string; email: string; password: string; img?: string } = {
    ...parsedData.data,
  };

  if (img.size > 0) {
    const findUser = await getUser(_id as object);

    if (findUser) {
      await deleteImage(findUser.img);
      const uploadImage = await uploadFile(img);
      data = { ...data, img: uploadImage };
    }
  }

  const hashedPassword = await cryptPassword(parsedData.data.password);
  await User.findByIdAndUpdate(_id, { ...data, password: hashedPassword });

  revalidatePath("/admin/profile");

  return { success: true };
};

export const createUser = async (
  initialState: formActionState,
  formData: FormData
): Promise<formActionState> => {
  await connectToDatabase();

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const role = formData.get("role")?.toString();
  const password = formData.get("password")?.toString();
  const img = formData.get("img") as File;

  const parsedData = userCreateSchema.safeParse({
    name,
    email,
    password,
    role,
    img,
  });

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    const hashedPassword = await cryptPassword(parsedData.data.password);

    const uploadImage = await uploadFile(img);
    const data = { ...parsedData.data, password: hashedPassword, img: uploadImage };

    await User.create(data);

    return { success: true };
  } catch (err) {
    console.log("Error creating user:" + err);
    return { success: false };
  }
};

export const deleteUser = async (userId: string) => {
  await connectToDatabase();

  const findUser = await User.findById(userId);

  if (findUser) {
    const userPosts = await Post.find({ wrote: findUser._id });

    userPosts.map((post) => {
      deletePostComments(post._id);
    });

    await Post.deleteMany({ wrote: findUser._id });
    await User.findByIdAndDelete(userId);
  }

  revalidatePath("admin/users");
};

export const updateUser = async (initialState: formActionState, formData: FormData) => {
  await connectToDatabase();

  const id = formData.get("id");
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const role = formData.get("role")?.toString();
  const password = formData.get("password")?.toString();

  const parsedData = updateCreateSchema.safeParse({
    name,
    email,
    password,
    role,
  });

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const hashedPassword = await cryptPassword(parsedData.data.password);
  const data = { ...parsedData.data, password: hashedPassword };

  try {
    await User.findByIdAndUpdate({ _id: id }, data);

    return { success: true };
  } catch (err) {
    console.log("update user error" + err);
    return { success: false };
  }
};
;

const deletePostComments = async (postId: object) => {
  await Comment.deleteMany({ post: postId });
  return;
};
