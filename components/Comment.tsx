import { CommentType } from "@/models/Comment";
import CommentReplies from "@/components/Comment";
import AnswerComment from "./AnswerComment";
import { commentReply } from "@/action/comment";
import { getAuthUser } from "@/lib/dal";
import { Modal } from "./Modal";

type CommentProps = {
  name: string;
  commentText: string;
  children: CommentType[];
  postId?: string;
};

const Comment = async ({ name, commentText, postId, children }: CommentProps) => {
  const authUser = await getAuthUser();

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg text-primary">{name}</h3>
        <li className="ml-3">{commentText}</li>
      </div>

      {children &&
        children.map((child: any) => {
          const { _id, name, text, children } = child;

          const isUserReply = authUser.name === child.name;

          return (
            <div key={_id} className="space-y-4 relative">
              <div className="ml-8">
                <CommentReplies
                  name={child.name}
                  commentText={child.text}
                  children={child.children}
                />
              </div>

              {isUserReply && (
                <Modal 
                  commentId={_id.toString()} 
                  postId={postId} 
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Comment;
