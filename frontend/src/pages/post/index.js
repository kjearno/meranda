import React from "react";
import { Helmet } from "react-helmet";
import { usePost, PostTemplate, Post } from "@features/posts";

export const PostPage = () => {
  const { post } = usePost();

  return (
    <>
      <Helmet title={post?.title} />

      <PostTemplate>
        <Post />
      </PostTemplate>
    </>
  );
};
