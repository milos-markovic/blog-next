import Link from "next/link";
import AnswerCommentForm from "./AnswerComment";
import DeleteButton from "./DeleteButton";
import ToggleStatusButton from "./ToggleStatusButton";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Comment, CommentType } from "@/models/Comment";
import {
  commentReply,
  deleteComment,
  deleteReply,
  updateCommentStatus,
} from "@/action/comment";
import { link } from "fs/promises";

type CommentCardProps = {
  comment: CommentType;
  statusRedirectUrl?: string;
  isShowAnswerBtn?: boolean;
  deleteAction?: (commentId: string) => {};
  link?: {
     linkUrl?: string,
     textLink?: string;
  } | null
};

const CommentCard = async ({
  comment,
  statusRedirectUrl = "/admin/comments",
  isShowAnswerBtn = true,
  deleteAction = deleteReply,
  link = null
}: CommentCardProps) => {

  const parentComment = await Comment.findById(comment.parent).lean() || null;
  const repliesNumber = (await Comment.find({ parent: comment._id })).length;
  const hasReples = repliesNumber > 0;

  return (
    <Card className="bg-card/70">
      <CardContent>
        <h3 className="text-lg text-primary">
          {comment.text}
        </h3>


        <p className="mt-8 text-sm">
          Wrote: <span className="text-primary">{comment.name}</span>
        </p>
        <p className="mt-2 text-sm">
          From post: <span className="text-primary">{comment.post.title}</span>
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3">
          <ToggleStatusButton
            action={updateCommentStatus}
            redirectUrl={statusRedirectUrl}
          >
            <input type="hidden" name="commentId" defaultValue={comment._id.toString()} />
            <Button type="submit" variant="secondary">
              {comment.status ? "Disapprove" : "Approve"}
            </Button>
          </ToggleStatusButton>
          <DeleteButton
            action={deleteAction}
            id={comment._id.toString()}
            confirmMessage="Are you sure that you want to delete comment, comment and all replies to comment will be deleted"
            message="Comment is deleted"
          />
          {isShowAnswerBtn && (
            <AnswerCommentForm
              commentId={comment._id.toString()}
              postId={comment.post._id.toString()}
              action={commentReply}
            />
          )}

          {link && hasReples && (
            <Button variant="link" asChild>
              <Link href={link?.linkUrl || ''}>
              {link?.textLink}
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommentCard;
