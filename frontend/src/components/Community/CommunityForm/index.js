//chat 작성 폼
import axios from "../../../api/user";
import React, { useState } from "react";

const CommunityForm = ({ getCommunity }) => {
  const [content, setContent] = useState(""); //댓글 내용

  // 서버에 채팅 보내기(post 방식)
  const sendCommunity = () => {
    const body = {
      content: content,
      currencyCode: "USD", //가지고 와야함
      nickname: sessionStorage.getItem("nickname"),
    };
    console.log(body);
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
    <form>
      <input
        value={content}
        name="content"
        placeholder="댓글을 달아주세엽"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
};

export default CommunityForm;
