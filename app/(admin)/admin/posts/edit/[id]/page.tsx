import { getPost } from "@/action/post";
import Title from "@/components/Title";
import UpdatePostForm from "./UpdatePostForm";

const EditPost = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const post = await getPost(id);

  return (
    <>
      <Title value={`Update Post: ${post.title}`} />

      <UpdatePostForm post={post} />
    </>
  );
};

export default EditPost;
