import { getAllPosts } from "@/action/post";
import { Pagination } from "@/components/Pagination";
import Post from "@/components/Post";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  // const searchValue = search || "";
  const currentPage = page ? Number(page) : 1;

  const { posts, pagination } = await getAllPosts(currentPage, 5);

  if(!posts.length){
    return <h2 className="text-2xl text-center">No Posts</h2>
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}

      <Pagination pagination={pagination} />
    </div>
  );
}
