import React from "react";
import { Avatar } from "@mui/material";

const PostLoading = () => {
  return (
    <div>
      <Avatar
        variant="square"
        src="/images/news_loading_last.gif"
        sx={{ width: "40%", height: "40%" }}
      ></Avatar>
    </div>
  );
};

export default PostLoading;
