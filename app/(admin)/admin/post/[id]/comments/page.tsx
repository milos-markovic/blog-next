import Title from "@/components/Title";
import { Post } from "@/models/Post";
import { Comment } from "@/models/Comment";

import CommentCard from "@/components/CommentCard";
import { deleteComment } from "@/action/comment";

export default async function PostComments({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await Post.findById(id).lean();
  const comments = await Comment.find({ post: id, parent: null })
    .populate("post")
    .sort({ _id: -1 })
    .lean();

  if (!comments.length) {
    return <Title value="No comments for this post" />;
  }

  return (
    <>
      <h2 className="text-2xl mb-10">
        Comments for post: <span className="text-primary">{post.title}</span>
      </h2>

      <div className="space-y-3">
        {comments.map((com) => {
          const { _id, name, text, status } = com;
          return (
            <CommentCard
              key={_id}
              comment={com}
              statusRedirectUrl={`/admin/post/${id}/comments`}
              isShowAnswerBtn={true}
              deleteAction={deleteComment}
              link={{ linkUrl: `/admin/comment/${_id}/my-replies`, textLink: "My Replies" }}
            />
          );
        })}
      </div>
    </>
  );
}
