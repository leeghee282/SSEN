import { image } from "d3";
import React from "react";
import { Avatar } from "@mui/material";
import "./style.css";

const Loading = () => {
  return (
    <div>
      <Avatar
        variant="square"
        src="/images/loading2.gif"
        sx={{ width: "80%", height: "80%" }}
      ></Avatar>
    </div>
  );
};

export default Loading;
