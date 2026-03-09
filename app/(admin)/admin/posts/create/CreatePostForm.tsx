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
import { createPost } from "@/action/post";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TiptapEditor from "@/components/Tiptap/TiptapEditor";

const CreatePostForm = () => {
  const router = useRouter();

  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [content, setContent] = useState("");

  const [state, formAction, pending] = useActionState(createPost, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success("Post is created");

      router.push("/admin/posts");
    }
  }, [state, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new post</CardTitle>
        <CardDescription>Enter information below to create new post</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Title</FieldLabel>
              <Input id="title" name="title" type="text" placeholder="Enter post title" />
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
              <Input id="img" name="img" type="file" />

              {state?.errors?.img &&
                state.errors.img.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}

              <FieldDescription>Must be png or jpg.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="dark:text-foreground" disabled={pending}>
                  {pending ? "Creating..." : "Create Post"}
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
