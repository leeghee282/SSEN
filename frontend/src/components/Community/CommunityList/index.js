import React, { useState } from "react";
import CommunityForm from "../CommunityForm";
import Community from "..";

function CommunityList() {
  const [community, setCommunity] = useState([]);

  const addCommunity = (chat) => {
    if (!chat.text || /^\s*$/.test(chat.text)) {
      return;
    }

    const newCommunity = [chat, ...community];

    setCommunity(newCommunity);
    console.log(...community);
  };

  const removeCommunity = (id) => {
    const removedArr = [...community].filter((chat) => chat.id !== id);

    setCommunity(removedArr);
  };

  return (
    <>
      <CommunityForm onSubmit={addCommunity} />
      <Community community={community} removeCommunity={removeCommunity} />
    </>
  );
}

export default CommunityList;
