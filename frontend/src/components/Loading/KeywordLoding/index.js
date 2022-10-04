import React from "react";
import { Avatar } from "@mui/material";

const KeywordLoading = () => {
  return (
    <div>
      <Avatar
        variant="square"
        src="/images/keyword_loading_last.gif"
        sx={{ width: "80%", height: "80%" }}
      ></Avatar>
    </div>
  );
};

export default KeywordLoading;
