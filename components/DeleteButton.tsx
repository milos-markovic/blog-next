"use client";

import { MouseEventHandler, useActionState } from "react";
import { Button } from "./ui/button";
import { formActionState } from "@/lib/validate";
import { deleteComment } from "@/action/comment";
import { toast } from "sonner";

type DeleteButtonProps = {
  action: (commentId: string) => {};
  id: string;
  confirmMessage: string;
  message: string;
};

const DeleteButton = ({ action, id, message, confirmMessage }: DeleteButtonProps) => {
  const handleDelete = (e: any) => {
    if (confirm(confirmMessage)) {
      const isDeleted = action(id);

      if (isDeleted) {
        toast.success(message);
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <Button onClick={handleDelete} variant="destructive">
      Delete
    </Button>
  );
};

export default DeleteButton;
