// Chat 컴포넌트 보였다 안보였다 하는 버튼
import React, { useState } from "react";
import CommunityList from "../CommunityList";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import "./style.css";

const CommunityButton = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>

{!visible && (
      <Box sx={{ background: "#F5F5F5", height: "1000px", width: "450px" }}>
        <button
          className="button_main"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? "채팅창 닫기" : "채팅창 열기"}
        </button>

        {visible && <CommunityList />}
      </Box>
      )}
      {visible && (
      <Box sx={{ background: "#707173", height: "1000px", width: "450px" }}>
        <button
          className="button_main"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? "채팅창 닫기" : "채팅창 열기"}
        </button>

        {visible && <CommunityList />}
      </Box>
      )}
    </>
  );
};

export default CommunityButton;
