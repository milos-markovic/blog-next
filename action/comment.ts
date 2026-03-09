"use server";

import { getAuthUser } from "@/lib/dal";
import { createCommentSchema, formActionState } from "@/lib/validate";
import { Comment } from "@/models/Comment";
import { revalidatePath } from "next/cache";
import { Post } from "@/models/Post";


export const insertComment = async (
  initialState: formActionState,
  formData: FormData
) => {
  const postId = formData.get("id");
  const name = formData.get("name");
  const text = formData.get("text");

  const parsedData = createCommentSchema.safeParse({
    name,
    text,
  });

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  } else {
    const data = { ...parsedData.data, post: postId };

    await Comment.create(data);

    revalidatePath(`/fullPost/${postId}`);

    return { success: true };
  }
};


function buildCommentsTree(comments: any[]) {
  const map = new Map();
  const roots: any[] = [];

  comments.forEach((c) => {
    c.children = [];
    map.set(c._id.toString(), c);
  });

  comments.forEach((c) => {
    if (c.parent) {
      map.get(c.parent.toString())?.children.push(c);
    } else {
      roots.push(c);
    }
  });

  return roots;
}

export const getPostComments = async (postId: string) => {
  const postComments = await Comment.find({ post: postId, status: true }).lean();

  const comments = buildCommentsTree(postComments);

  return comments;
};


export const getComments = async () => {
  const authUser = await getAuthUser();

  let comments = [];

  if (authUser?.role === "user") {
    const authUserPosts = await Post.find({ wrote: authUser._id }).lean();
    const authUserComments: any[] = [];

    for (const post of authUserPosts) {
      const postCommentsDoc = await Comment.find({ post: post._id })
        .populate("post", "-wrote")
        .sort({ _id: -1 })
        .lean();

      authUserComments.push(...postCommentsDoc);
    }

    comments = authUserComments.map((com) => {
      return { ...com, _id: com._id.toString(), post: { ...com.post, _id: com.post._id.toString() } };
    });
  } else {
    const commentsDoc = await Comment.find({ parent: null })
      .populate("post", "-wrote")
      .sort({ _id: -1 })
      .lean();

    comments = commentsDoc.map((com) => {
      return {
        ...com,
        _id: com._id.toString(),
        post: { ...com.post, _id: com.post._id.toString() },
      };
    });
  }

  return comments;
};


export const getComment = async (id: string) => {
  return await Comment.findById(id).lean();
};


export const updateCommentStatus = async (
  prevState: formActionState,
  formData: FormData
) => {
  const commentId = formData.get("commentId");
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return { success: false };
  }

  comment.status = !comment.status;
  comment.save();

  revalidatePath("/admin/comments");

  return { success: true };
};


export const deleteComment = async (commentId: string) => {
  const comment = await getComment(commentId);

  if (!comment) {
    return false;
  }

  const children = await Comment.find({ parent: comment._id });
  const hasChildren = children.length > 0;

  if (hasChildren) {
    for (const child of children) {
      // delete reply to my reply
      await Comment.deleteMany({ parent: child._id });
    }
    // delete my comments
    await Comment.deleteMany({ parent: commentId });
  }

  // delete comment
  await Comment.findByIdAndDelete(commentId);

  revalidatePath("/admin/posts");

  return true;
};


export const commentReply = async (initialState: formActionState, formData: FormData) => {

  console.log("dolazi");
  const authUser = await getAuthUser();

  const name = formData.get("name");
  const parent = formData.get("commentId");
  const post = formData.get("postId");
  const text = formData.get("commentText");

  const parsedData = createCommentSchema.safeParse({
    name: name ? name : authUser.name,
    text,
  });

  if (!parsedData.success) {
    console.log(parsedData.error.flatten().fieldErrors)
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  } else {
    const data = {
      ...parsedData.data,
      post,
      parent,
    };

    await Comment.create(data);

    revalidatePath("/admin/posts");

    return { success: true };
  }
};

export const deleteReply = async (replyId: string) => {
  const comment = await getComment(replyId);

  if (!comment) {
    return false;
  }

  const replies = await Comment.find({ parent: replyId });

  if (replies.length > 0) {
    // delete all replies
    await Comment.deleteMany({ post: comment.post });
  }

  await Comment.findByIdAndDelete(replyId);

  revalidatePath("/admin/comments");

  return true;
};
