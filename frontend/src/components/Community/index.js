// chat 전체 리스트 map해서 보여주는 곳
import React from "react";
import axios from "../../api/user";

const Community = ({ community, removeCommunity, getCommunity }) => {
  // chat 삭제(delete)
  const deleteCommunity = (event) => {
    console.log(event);
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
    <div>
      <div>{chat.content}</div>
      <div>{chat.nickname}</div>
      <div>{chat.regdate.slice(0, 10)}</div>
      {/* 작성자만 삭제 버튼 보일 수 있게 작성 */}
      {chat.nickname === sessionStorage.getItem("nickname") && (
        <div className="icons">
          <button
            onClick={() => deleteCommunity({ params: { uid: chat.uid } })}
            className="delete-icon"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  ));
};

export default Community;
