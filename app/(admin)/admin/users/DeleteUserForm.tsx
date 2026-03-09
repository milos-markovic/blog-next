"use client";

import { deleteUser } from "@/action/user";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeleteUserForm = ({ id }: { id: string }) => {
  return (
    <form
      action={deleteUser.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this user?")) {
          e.preventDefault();
        } else {
          toast.success("User has been deleted");
        }
      }}
    >
      <Button type="submit" variant="destructive">
        <Trash2 />
        Delete
      </Button>
    </form>
  );
};

export default DeleteUserForm;
