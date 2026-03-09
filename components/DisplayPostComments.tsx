import Comment from "./Comment";
import { getPostComments } from "@/action/comment";

const DisplayPostComments = async ({ postId }: { postId: string }) => {
  const comments = await getPostComments(postId);

  return (
    <div className="transition-all ease-in-out delay-300">
      <h2 className="text-xl my-2">Comments:</h2>

      <div className="space-y-2">
        {comments.map((com) => {
          const { name, text, post, children } = com;

          return (
            <Comment
              key={com._id.toString()}
              name={name}
              commentText={text}
              children={children}
              postId={post.toString()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DisplayPostComments;
