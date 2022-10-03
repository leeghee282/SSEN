import React from "react";
import Spinner from "../Loading/Spinner";
import { Typography, Box, Link } from "@mui/material";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography fontSize="28px" fontWeight="600" marginTop="20px" marginBottom="6px">관련 뉴스 정보</Typography>
      {posts.map((post) => (
        <Link
          href={post.url}
          target="_blank"
          sx={{ textDecoration: "none", color: "black", }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "50px",
              mt: 1,
              border: "3px solid black",
              borderRadius: "10px",

              "&:hover": {
                background: "#DEE0E4",
              },
            }}
          >
            <Typography sx={{pl:1}}>{post.title.length >= 1
                                    ? post.title.replaceAll("…", " ").substr(0, 33) +
                                      "..."
                                    : post.title}</Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Posts;
