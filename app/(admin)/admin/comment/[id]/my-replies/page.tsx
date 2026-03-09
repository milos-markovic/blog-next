import { deleteComment } from "@/action/comment";
import CommentCard from "@/components/CommentCard";
import { Comment } from "@/models/Comment";

export default async function CommentReplies({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const parentComment = await Comment.findById(id).lean();
  const comments = await Comment.find({ parent: id })
                                    .populate("post")

                                    .lean();

  if (!parentComment) {
    return <p>Comment not found</p>;
  }
 
  return (
    <div>
        <h2 className="text-2xl mb-10">My replies to comment: <span className="text-primary">{parentComment.text}</span></h2>
    
        <div className="space-y-3">
          {comments.map((comment) => (
              <CommentCard key={comment._id.toString()}
                  comment={comment} 
                  statusRedirectUrl={`/admin/comment/${id}/my-replies`}
                  isShowAnswerBtn={false}
                  deleteAction={deleteComment} 
                  link={{ linkUrl: `/admin/comment/${comment._id.toString()}/replies`, textLink: 'View replies' }}
              />
          ))}
        </div>
    </div>
  )
}
 