"use client";

import { deletePost } from "@/action/post";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeletePostForm = ({ id }: { id: string }) => {
  const handleDeletePost = async () => {
    const confirmed = confirm("Are you sure that you want to delete post?");
    if (!confirmed) {
      return;
    } else {
      toast.warning("Post is deleted");
    }

    await deletePost(id);
  };

  return (
    <Button onClick={handleDeletePost} variant="destructive" className="cursor-pointer">
      <Trash2 />
      Delete
    </Button>
  );
};

export default DeletePostForm;
