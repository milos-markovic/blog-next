"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formActionState } from "@/lib/validate";
import { useActionState, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { FieldDescription } from "./ui/field";

type AnswerCommentProps = {
  commentId: string;
  replyId?: string;
  postId?: string;
  action: (prevState: formActionState, formData: FormData) => Promise<formActionState>;
  btnVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  isPublic?: boolean;
};

const AnswerCommentForm = ({
  commentId,
  postId,
  action,
  btnVariant = "default",
  isPublic = false,
}: AnswerCommentProps) => {
  const [isShowtextarea, showTextArea] = useState(false);

  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Comment has replyed");
      showTextArea(false);
    }
  }, [state]);

  return (
    <div>
      <Button variant={btnVariant} onClick={() => showTextArea(!isShowtextarea)}>
        {isShowtextarea ? "Hide Answer" : "Answer"}
      </Button>

      <form action={formAction} className="mt-2 mb-5">
        <input type="hidden" name="commentId" defaultValue={commentId} />
        <input type="hidden" name="postId" defaultValue={postId} />

        {isShowtextarea && (
          <div className="space-y-3">
            {isPublic && <Input name="name" id="name" placeholder="Your name" />}

            <Textarea
              name="commentText"
              rows={8}
              cols={60}
              placeholder="Your comment text"
              className="bg-input"
            />

            {state?.errors?.text &&
              state.errors.text.map((errorMsg, index) => (
                <FieldDescription key={index} className="text-red-600">
                  {errorMsg}
                </FieldDescription>
              ))}

            <Button
              disabled={pending}
              variant="default"
              type="submit"
              size="sm"
              className="ml-auto"
            >
              {pending ? "Replyed ..." : "Reply"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AnswerCommentForm;
