import Title from "@/components/Title";
import React from "react";
import CreatePostForm from "./CreatePostForm";

const CreatePost = () => {
  return (
    <>
      <Title value="Create Post" />

      <CreatePostForm />
    </>
  );
};

export default CreatePost;
