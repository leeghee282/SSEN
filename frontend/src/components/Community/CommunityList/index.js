// chat form, list 컴포넌트 보여주는 곳

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../api/user";
import CommunityForm from "../CommunityForm";
import Community from "..";
import "./style.css";

function CommunityList() {
  const currencyCode = useSelector((state) => state.chartReducer.chartCode);
  const [community, setCommunity] = useState([]);

  // 서버에서 채팅 받아오기(get방식)
  const getCommunity = () => {
    axios
      .get("/api/v1/chat", { params: { currencyCode: currencyCode } })
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
      <div className="timeLineWrap">
        {currencyCode === "USD" && <p className="chatCodeTitle">달러/원</p>}
        {currencyCode === "EUR" && <p className="chatCodeTitle">유로/원</p>}
        {currencyCode === "GBP" && <p className="chatCodeTitle">파운드/원</p>}
        {currencyCode === "JPY" && <p className="chatCodeTitle">엔/원</p>}
        {currencyCode === "CNY" && <p className="chatCodeTitle">위안/원</p>}
        <CommunityForm getCommunity={getCommunity} />
        <Community
          community={community}
          key={community.content}
          removeCommunity={removeCommunity}
          getCommunity={getCommunity}
        />
      </div>
    </>
  );
}

export default CommunityList;
