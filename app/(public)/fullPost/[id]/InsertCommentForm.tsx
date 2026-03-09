"use client";

import { insertComment } from "@/action/comment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formActionState } from "@/lib/validate";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const InsertCommentForm = ({ postId }: { postId: string }) => {
  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(insertComment, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Comment is created");
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insert comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <input type="hidden" name="id" defaultValue={postId} />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="Your name" className="bg-input border" />
              {state?.errors?.name &&
                state.errors.name.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </Field>
            <Field>
              <FieldLabel htmlFor="text">Comment</FieldLabel>
              <textarea id="text" name="text" rows={4} placeholder="Your comment" className="bg-input dark:bg-input/30 border rounded-md p-2 w-full" />
              {state?.errors?.text &&
                state.errors.text.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Button variant="ghost" type="submit" className="text-foreground mt-5">
                Create Comment
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default InsertCommentForm;
