import React, { useRef, useState } from "react";
import BasicModal from "./MyAssetModal";
import MyAssetItemList from "./MyAssetItemList";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function MySet() {
  // 임시 데이터
  const [myAsset, setMyAsset] = useState([]);

  const nextId = useRef(0);
  const handleSumit = (currency_code, quantity, price) => {
    const asset = {
      id: nextId.current,
      currency_code,
      quantity,
      price,
    };
    setMyAsset(myAsset.concat(asset));
    nextId.current += 1;
  };

  // 삭제 기능
  const onRemove = (id) => {
    setMyAsset(myAsset.filter((asset) => asset.id !== id));
  };

  // // 수정 기능
  // const onUpdate = (id) => {
  //   setMyAsset()
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 보유외화목록 title */}
      <Typography id="font_test" component="h1" variant="h4">
        보유 외화 목록
      </Typography>
      <br/>
      <BasicModal onSubmit={handleSumit}/>
      <br/>
      <MyAssetItemList myAsset={myAsset} onRemove={onRemove} />
    </Box>
  );
}
