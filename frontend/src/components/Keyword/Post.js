import React from "react";
import Spinner from "../Loading/Spinner";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
};

export default Posts;
