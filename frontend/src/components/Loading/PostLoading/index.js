import React from "react";
import { Avatar,Box } from "@mui/material";


const PostLoading = () => {
  return (
    <Box sx={{display:"flex",justifyContent:"center"}}>
      <Avatar
        variant="square"
        src="/images/news_loading_last.gif"
        sx={{ width: "40%", height: "40%" }}
      ></Avatar>
    </Box>
  );
};

export default PostLoading;
