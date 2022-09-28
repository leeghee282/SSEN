// chat form, list 컴포넌트 보여주는 곳
import React, { useState, useEffect } from "react";
import axios from "../../../api/user";
import CommunityForm from "../CommunityForm";
import Community from "..";

function CommunityList() {
  const [community, setCommunity] = useState([]);

  // 서버에서 채팅 받아오기(get방식)
  const getCommunity = () => {
    axios
      .get("/api/v1/chat", { params: { currencyCode: "USD" } }) // code를 차트에 따라 받아와야하는데 어케 해요?
      .then((response) => setCommunity(response.data));
  };
  useEffect(() => {
    getCommunity();
  }, []);

  useEffect(() => {}, [community]);

  // 삭제 기능
  const removeCommunity = (uid) => {
    setCommunity(community.filter((commu) => commu.uid !== uid));
  };

  return (
    <>
      <CommunityForm getCommunity={getCommunity} />
      <Community
        community={community}
        key={community.uid}
        removeCommunity={removeCommunity}
        getCommunity={getCommunity}
      />
    </>
  );
}

export default CommunityList;
