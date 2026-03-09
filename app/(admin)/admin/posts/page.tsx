import Title from "@/components/Title";
import TableData from "@/components/TableData";
import { getPosts, togglePostStatus } from "@/action/post";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, UserRoundPen } from "lucide-react";
import { shortenByWords } from "@/lib/utils";
import DeletePostForm from "./DeletePostForm";
import { getAuthUser } from "@/lib/dal";
import { Pagination } from "@/components/Pagination";
import Form from "next/form";
import { Input } from "@/components/ui/input";

const AdminPosts = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) => {
  const { page, query } = await searchParams;
  const currentPage = page ? Number(page) : 1;
  const searchQuery = query ? query : "";

  const authUser = await getAuthUser();
  const isdmin = authUser?.role === "admin";

  const { posts, pagination } = await getPosts(currentPage, 5, searchQuery);

  if (!posts.length) {
    return (
      <>
        <Title value="No posts" />

        <Button asChild variant="secondary">
          <Link href="posts/create">Create Post</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <Title value="Post Data" />

      <Form action="http://localhost:3000/admin/posts" className="mb-8 flex justify-end">
        <div className="flex gap-3 w-80">
          <Input name="query" placeholder="Search by post name" className="bg-input border" />
          <Button type="submit" className="bg-primary">Search</Button>
        </div>
      </Form>

      <TableData
        heads={["Title", "Content", "Image", "Wrote", "Comments", "Actions"]}
        caption="A list of Posts"
        actionsHeadSpan={3}
      >
        {posts.map((post, index) => {
          const { _id, title, content, img, wrote, status } = post;
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell>
                <div
                    dangerouslySetInnerHTML={{ __html: shortenByWords(content, 8) }}
                />
              </TableCell>
              <TableCell>
                <Image
                  src={img}
                  width={100}
                  height={100}
                  alt="post image"
                />
              </TableCell>
              <TableCell>{wrote.name}</TableCell>
              <TableCell>
                <Button variant="link" asChild>
                  <Link href={`/admin/post/${_id}/comments`}>Comments</Link>
                </Button>
              </TableCell>

              {isdmin && (
                <TableCell className="text-center">
                  <form action={togglePostStatus.bind(null, _id)}>
                    <Button variant="outline" type="submit">
                      {status ? "Disapprove" : "Approve"}
                    </Button>
                  </form>
                </TableCell>
              )}

              <TableCell className="text-center">
                <Button asChild>
                  <Link href={`/admin/posts/edit/${_id}`}>
                    <UserRoundPen />
                    Update
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <DeletePostForm id={_id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableData>

      <Pagination pagination={pagination} />

      {
        <Button asChild>
          <Link href="posts/create">Create Post</Link>
        </Button>
      }
    </>
  );
};

export default AdminPosts;