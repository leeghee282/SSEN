// Chat 컴포넌트 보였다 안보였다 하는 버튼
import React, { useState } from "react";
import CommunityList from "../CommunityList";

const CommunityButton = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "안보이게" : "보이게"}
      </button>
      {visible && <CommunityList />}
    </>
  );
};

export default CommunityButton;
