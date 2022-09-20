import React, { useRef, useState } from "react";
import BasicModal from "./MyAssetModal";
import MyAssetItemList from "./MyAssetItemList";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function MySet() {
  // 임시 데이터
  const [myAsset, setMyAsset] = useState([
    {
      id: 1,
      currncy_code: 'USD',
      quantity: '30',
      price: '41673.30',
    },
    {
      id: 2,
      currncy_code: 'USD',
      quantity: '50',
      price: '69455.50',
    },
    {
      id: 3,
      currncy_code: 'EUR',
      quantity: '40',
      price: '55695.76',
    },
    {
      id: 4,
      currncy_code: 'JPY',
      quantity: '5000',
      price: '48514.42',
    },
  ]);

  const nextId = useRef(5); //수정 필요
  const handleSumit = (currency_code, quantity, price) => {
    const repo = {
      id: nextId.current,
      currency_code,
      quantity,
      price,
    };
    setMyAsset(myAsset.concat(repo));
    nextId.current += 1;
    // console.log(repo)
  };

  // 삭제 기능
  const onRemove = (id) => {
    setMyAsset(myAsset.filter((repo) => repo.id !== id));
  };

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
      <BasicModal onSubmit={handleSumit}/>
      <MyAssetItemList myAsset={myAsset} onRemove={onRemove} />
    </Box>
  );
}
