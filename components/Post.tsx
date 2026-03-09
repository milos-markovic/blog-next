import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { shortenByWords } from "@/lib/utils";
import PostComments from "./PostComments";
import { CommentType } from "@/models/Comment";
import DisplayPostComments from "./DisplayPostComments";

type PostProps = {
  post: {
    title: string;
    content: string;
    img: string;
    wrote: {
      name: string;
    };
    _id: string;
  };
  postComments?: CommentType[];
  isFullPost?: boolean;
};

export async function Post({
  post: { title, content, img, wrote, _id },
  postComments = [],
  isFullPost = false,
}: PostProps) {
  return (
    <Card className="bg-card/60 border border-border">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          <h2 className="text-xl text-[#1F2E27] dark:text-[#E1E8E4] font-semibold">{title}</h2>
        </CardTitle>

        {!isFullPost && (
          <CardAction>
            <Button asChild className="bg-primary hover:primary-hover">
              <Link href={`fullPost/${_id}`}>View Full Post</Link>
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <Image
          width={2000}
          height={200}
          quality={100}
          priority
          src={img}
          alt="post image"
          className="w-full h-100 object-cover rounded-lg"
        />

        <div
          className="mt-4 text-foreground"
          dangerouslySetInnerHTML={{
            __html: isFullPost ? content : shortenByWords(content, 30),
          }}
        />
      </CardContent>

      <CardFooter className="flex justify-end">
        <p className="text-right text-muted-foreground">wrote: {wrote?.name}</p>
      </CardFooter>

      {isFullPost && (
        <CardContent>
          <PostComments>
            <DisplayPostComments postId={_id} />
          </PostComments>
        </CardContent>
      )}
    </Card>
  );
}

export default Post;
