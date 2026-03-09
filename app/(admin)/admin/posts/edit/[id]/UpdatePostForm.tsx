"use client";

import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formActionState } from "@/lib/validate";
import { Textarea } from "@/components/ui/textarea";
import { postType } from "@/models/Post";
import Image from "next/image";
import { updatePost } from "@/action/post";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TiptapEditor from "@/components/Tiptap/TiptapEditor";

type UpdatePostFormProps = {
  post: postType;
};

const UpdatePostForm = ({ post }: UpdatePostFormProps) => {
  const router = useRouter();

  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [content, setContent] = useState(post.content);
  
  const [state, formAction, pending] = useActionState(updatePost, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success("Post is updated");

      router.push("/admin/posts");
    }
  }, [state, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update post</CardTitle>
        <CardDescription>Enter information below to update post</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <input name="id" type="hidden" defaultValue={post._id?.toString()} />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Title</FieldLabel>
              <Input
                defaultValue={post.title}
                id="title"
                name="title"
                type="text"
                placeholder="Enter post title"
              />
              {state?.errors?.title &&
                state.errors.title.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </Field>
            <Field>
              <FieldLabel htmlFor="content">Content</FieldLabel>

              <TiptapEditor value={content} onChange={setContent} />
              <input type="hidden" name="content" value={content} />

              {state?.errors?.content &&
                state.errors.content.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </Field>

            <Field>
              <FieldLabel htmlFor="img">Image</FieldLabel>

              <div>
                <Image
                  src={post.img}
                  width={70}
                  height={70}
                  alt="post image"
                  className="aspect-square object-cover rounded-lg"
                />
              </div>
              <Input id="img" name="img" type="file" />

              {state?.errors?.img &&
                state.errors?.img.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}

              <FieldDescription>Must be png or jpg.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="dark:text-foreground" disabled={pending}>
                  {pending ? "Updating..." : "Update Post"}
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePostForm;
