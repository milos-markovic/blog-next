"use server";

import { getAuthUser } from "@/lib/dal";
import { Post } from "@/models/Post";
import { User } from "@/models/User";
import { Comment } from "@/models/Comment";

export const countDocuments = async () => {
  const authUser = await getAuthUser();

  let countUsers;
  let countPosts;
  let countComments;

  if (authUser.role === "admin") {
    countUsers = await User.countDocuments();
    countPosts = await Post.countDocuments();
    countComments = await Comment.countDocuments();
  } else {
    countUsers = await User.countDocuments({ _id: authUser._id });
    countPosts = await Post.countDocuments({ wrote: authUser._id });
    countComments = await Comment.countDocuments({ name: authUser.name });
  }

  return {
    countUsers,
    countPosts,
    countComments,
  };
};
