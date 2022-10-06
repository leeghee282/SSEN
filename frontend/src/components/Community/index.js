// chat 전체 리스트 map해서 보여주는 곳
import React from "react";
import axios from "../../api/user";
import "./style.css"


const Community = ({ community, removeCommunity, getCommunity }) => {
  // chat 삭제(delete)
  const deleteCommunity = (event) => {
    try {
      axios
        .delete(`/api/v1/chat/`, { params: { uid: event.params.uid } })
        .then((response) => {
          if (response.status === 200) {
            getCommunity();
          }
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return community.map((chat) => (
    <div className="history">
      <div className="content_box">
        <div className="time">{chat.regdate.slice(0, 10)}</div>
        <div className="nickname">{chat.nickname}</div> 
        <div className="content">{chat.content}</div>
      </div>
      {/* 작성자만 삭제 버튼 보일 수 있게 작성 */}
      {chat.nickname === sessionStorage.getItem("nickname") && (
        <button
          onClick={() => deleteCommunity({ params: { uid: chat.uid } })}
          className="button_icon"
        >
          삭제
        </button>
      )}
    </div>
  ));
};

export default Community;
