//chat 작성 폼
import axios from "../../../api/user";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css"

const CommunityForm = ({ getCommunity }) => {
  const currencyCode = useSelector((state) => state.chartReducer.chartCode);
  const [content, setContent] = useState(""); //댓글 내용

  // 서버에 채팅 보내기(post 방식)
  const sendCommunity = () => {
    const body = {
      content: content,
      currencyCode: currencyCode,
      nickname: sessionStorage.getItem("nickname"),
    };
    axios.post("/api/v1/chat/", body).then((response) => getCommunity());
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContent("");
    sendCommunity();
  };

  return (
    <div>
      <div>
        <input
          className="comment"
          value={content}
          name="content"
          placeholder="댓글을 작성해주세요 😊"
          onChange={handleChange}
          style={{ fontSize:"16px", color:"#333333"}}
        />
      </div>
      <div className="button" onClick={handleSubmit} style={{ textAlign: "center" }}>
        댓글 작성
      </div>
    </div>
  );
};

export default CommunityForm;
