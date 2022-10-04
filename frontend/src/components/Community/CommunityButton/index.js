// Chat 컴포넌트 보였다 안보였다 하는 버튼
import React, { useState } from "react";
import CommunityList from "../CommunityList";
import { Box } from "@mui/system";
import { Avatar, Button, Typography, Link } from "@mui/material";
import "./style.css";

const CommunityButton = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {!visible && (
        <Box sx={{  height: "1000px", width: "450px" }}>
          <Link href="/exchangecalc">
            <Avatar
              sx={{ width: "150px", height: "150px", position: "fixed" }}
              className="cal"
              src="images/ssencal.gif"
            ></Avatar>
          </Link>
          <Avatar
            sx={{ width: "150px", height: "150px", position: "fixed" }}
            onClick={() => {
              setVisible(!visible);
            }}
            className="chat_main"
            src="images/ssenchat.gif"
          >
            <button
              className="button_main"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              {visible ? "채팅창 닫기" : "채팅창 열기"}
            </button>
          </Avatar>
          {visible && <CommunityList />}
        </Box>
      )}
      {visible && (
        <Box sx={{ height: "1000px", width: "460px" }}>
          <Avatar
            className="chat_title"
            src="images/ssenchat3.png"
            sx={{ mt:10, width: "350px", height: "110px" }}
            variant="square"
          />
          <CommunityList></CommunityList>
          <button
            position="absolute"
            className="button_main"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {visible ? "채팅창 닫기" : "채팅창 열기"}
          </button>
        </Box>
      )}
    </>
  );
};

export default CommunityButton;
