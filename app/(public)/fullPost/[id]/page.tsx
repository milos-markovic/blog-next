import Post from "@/components/Post";
import InsertCommentForm from "./InsertCommentForm";
import { Post as PostModel } from "@/models/Post";

export default async function FullPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await PostModel.findById(id).populate("wrote").lean();

  return (
    <div className="space-y-4">
      <Post post={post} isFullPost={true} />
      <InsertCommentForm postId={id} />
    </div>
  );
}
