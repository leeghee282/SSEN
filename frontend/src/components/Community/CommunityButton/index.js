// Chat 컴포넌트 보였다 안보였다 하는 버튼
import React, { useState } from "react";
import CommunityList from "../CommunityList";

const CommunityButton = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button
        className="button"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "채팅창 닫기" : "채팅창 열기"}
      </button>
      {visible && <CommunityList />}
    </>
  );
};

export default CommunityButton;
