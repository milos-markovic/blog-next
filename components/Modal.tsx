'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import { formActionState } from "@/lib/validate"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { commentReply } from "@/action/comment"

type ModalProps = { 
  commentId?: string;
  postId?: string;
}

export function Modal({
  commentId,
  postId
}: ModalProps) {

  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [showDialog, setShowDialog] = useState(false);

  const [state, formAction, pending] = useActionState(commentReply, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Comment has replyed");
      setShowDialog(false);
    }
  }, [state]);

  return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="absolute -top-3 left-32">Answer</Button>
          </DialogTrigger>
      
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Answer to comment</DialogTitle>
              <DialogDescription>
                Answer to comment. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <form action={formAction}>
              <FieldGroup>
                <input type="hidden" name="commentId" defaultValue={commentId} />
                <input type="hidden" name="postId" defaultValue={postId} />

                <Field>
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" placeholder="Your name" className="bg-input" />

                  {state?.errors?.name &&
                    state.errors.name.map((errorMsg, index) => (
                      <FieldDescription key={index} className="text-red-600">
                        {errorMsg}
                      </FieldDescription>
                    ))}
                </Field>
                <Field>
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea id="comment" name="commentText" rows={4} placeholder="Write your comment here..." className="bg-input" />

                   {state?.errors?.text &&
                    state.errors.text.map((errorMsg, index) => (
                      <FieldDescription key={index} className="text-red-600">
                        {errorMsg}
                      </FieldDescription>
                    ))}
                </Field>
              </FieldGroup>
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        
      </Dialog>
    
  )
}
