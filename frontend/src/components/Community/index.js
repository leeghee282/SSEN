import React, { useState } from "react";
import CommunityForm from "./CommunityForm";

const Community = ({ community, removeCommunity }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <CommunityForm edit={edit} onSubmit={submitUpdate} />;
  }

  return community.map((chat, index) => (
    <div key={index}>
      <div key={chat.id}>{chat.text}</div>
      <div className="icons">
        <button
          onClick={() => removeCommunity(chat.id)}
          className="delete-icon"
        >
          delete
        </button>
      </div>
    </div>
  ));
};

export default Community;
