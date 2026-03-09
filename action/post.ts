"use server";

import connectToDatabase from "@/db/connectDB";
import { getAuthUser } from "@/lib/dal";
import { formActionState, postCreateSchema, postUpdateSchema } from "@/lib/validate";
import { Post } from "@/models/Post";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs";
import { Comment } from "@/models/Comment";

export const getPosts = async (page: number, limit: number, searchQuery: string = "") => {
  await connectToDatabase();

  const authUser = await getAuthUser();

  const regex = new RegExp(searchQuery, "i");

  let data;

  if (authUser.role === "admin") {
    data = await getAllPosts(page, limit, { title: { $regex: regex } });
  } else {
    data = await getAllPosts(page, limit, {
      title: { $regex: regex },
      wrote: authUser._id,
    });
  }

  return data;
};

export const getAllPosts = async (
  page: number = 1,
  limit: number = 5,
  query: object = { status: true }
) => {
  await connectToDatabase();

  const skip = (page - 1) * limit;

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("wrote", "-_id name")
    .lean();

  const totalPages = Math.ceil((await Post.countDocuments()) / limit);

  return {
    posts: posts.map((post) => ({ ...post, _id: post._id.toString() })),
    pagination: {
      totalPosts: await Post.countDocuments(),
      totalPages: totalPages,
      page: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const createPost = async (initialState: formActionState, formData: FormData) => {
  await connectToDatabase();

  const authUser = await getAuthUser();

  const title = formData.get("title");
  const content = formData.get("content");
  const img = formData.get("img") as File;

  const parsedData = postCreateSchema.safeParse({
    title,
    content,
    img,
  });

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  } else {
    if (img.size > 0) {
      const uploadedFile = await uploadFile(img);

      const data = { ...parsedData.data, img: uploadedFile, wrote: authUser._id };

      if (uploadedFile) {
        await Post.create(data);
      }
    }
  }

  return { success: true };
};

const uploadFile = async (file: File) => {
  if (!file) {
    return;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "img/posts");

  const filename = `${file.name}`;
  const filepath = path.join(uploadDir, filename);

  await writeFile(filepath, buffer);

  return `/img/posts/${filename}`;
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

export const deletePost = async (id: string) => {
  await connectToDatabase();

  const findPost = await getPost(id);

  if (findPost) {
    await deleteImage(findPost.img);

    await Comment.deleteMany({ post: findPost._id });
    await Post.findByIdAndDelete(id);
  }

  revalidatePath("admin/posts");
};

export const getPost = async (id: string) => {
  await connectToDatabase();

  const postDoc = await Post.findById(id).populate("wrote", "-_id name").lean();
  const post = { ...postDoc, _id: postDoc._id.toString() };

  return post;
};

export const updatePost = async (initialState: formActionState, formData: FormData) => {
  await connectToDatabase();

  const id = formData.get("id") as string;
  const title = formData.get("title");
  const content = formData.get("content");
  const file = formData.get("img") as File | null;

  const parsedData = postUpdateSchema.safeParse({
    title,
    content,
    file,
  });

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  } else {
    const findPost = await getPost(id);

    let data: { title: string; content: string; img?: string } = parsedData.data;

    if (file && file.size > 0) {
      // delete current post image
      await deleteImage(findPost.img);
      // upload new image
      const uploadedFile = await uploadFile(file);
      if (uploadedFile) {
        data = { ...parsedData.data, img: uploadedFile };
      }
    }

    await Post.findByIdAndUpdate(id, data);
  }

  return { success: true };
};

export const togglePostStatus = async (postId: string) => {
  const findPost = await Post.findById(postId);
  findPost.status = !findPost.status;
  findPost.save();

  revalidatePath("admin/posts");
};

export const searchPosts = async (searchQuery: string) => {
  await connectToDatabase();

  const query = searchQuery.trim();
  const regex = new RegExp(query, "i");

  const postsDocs = await Post.find(
    { title: { $regex: regex }, status: true },
    "title img"
  )
    .sort({ createdAt: -1 })
    .lean();

  const posts = postsDocs.map((post) => ({ ...post, _id: post._id.toString() }));

  return posts;
};
