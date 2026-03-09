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
  const comments = await Comment.find({ parent: id }).populate("post").lean();  

 
  return (
    <div>
      <h2 className="text-2xl mb-8">Replies to my comment: <span className="text-primary">{parentComment.text}</span></h2>

      <div className="space-y-3">
        {comments.map((comment) => (
            <CommentCard key={comment._id.toString()}
                comment={comment} 
                statusRedirectUrl={`/admin/comment/${id}/replies`}
                isShowAnswerBtn={true}     
                deleteAction={deleteComment}
                link={{ linkUrl: `/admin/comment/${comment._id.toString()}/my-replies`, textLink: 'My replies' }}
            />
        ))} 
      </div>    
    </div>
  )
}