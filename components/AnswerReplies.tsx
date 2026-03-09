import { getAnswersToReply } from "@/action/comment";
import Comment from "./Comment";

const AnswersToReply = async ({ replyId }: { replyId: object }) => {
  const answerReplyes = await getAnswersToReply(replyId);

  return (
    <div className="ml-10 mt-2 space-y-2">
      {answerReplyes.map((answer, index) => {
        const { name, commentText, status } = answer;
        return (
          <div key={index}>
            {status && <Comment name={name} commentText={commentText} />}
          </div>
        );
      })}
    </div>
  );
};

export default AnswersToReply;
