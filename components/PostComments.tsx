"use client";

import { Button } from "./ui/button";
import { useState } from "react";

const PostComments = ({ children }: { children?: React.ReactNode }) => {
  const [showComments, toggleComments] = useState(false);

  return (
    <>
      <Button onClick={() => toggleComments(!showComments)}>
        {showComments ? "Hide" : "Show"} Comments
      </Button>

      {showComments && children}
    </>
  );
};

export default PostComments;
