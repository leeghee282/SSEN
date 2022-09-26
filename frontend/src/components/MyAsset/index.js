import React, { useContext, useEffect, useRef, useState } from "react";
import BasicModal from "./MyAssetModal";
import MyAssetItemList from "./MyAssetItemList";
import MyAssetTotal from "./MyAssetTotal";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import axios from "../../api/user";

export default function MySet() {
  const [myAsset, setMyAsset] = useState([]);
  const [live, setLive] = useState([]);

  // 삭제 기능
  const myAssetRemove = (uid) => {
    setMyAsset(myAsset.filter((asset) => asset.uid !== uid));
  };

  // 서버에서 보유 통화 받아오기(get방식)1
  const getMyAssetData = () => {
    axios
      .get(`/api/v1/holdcurr/${sessionStorage.getItem("userId")}`)
      .then((response) => setMyAsset(response.data));
  };
  useEffect(() => {
    getMyAssetData();
  }, []);

  useEffect(() => {}, [myAsset]);

  // 서버에서 실시간 환율 받아오기(get방식)
  const getLiveData = () => {
    axios.get(`/api/v1/live/`).then((response) => setLive(response.data));
  };
  useEffect(() => {
    getLiveData();
  }, []);

  useEffect(() => {}, [live]);

  // 서버에서 보유 통화 받아오기(get방식)2
  // const getMyAssetData = (e) => {
  //   try {
  //     axios
  //       .get("http://localhost:8080/api/v1/holdcurr/ssafy10")
  //       .then((response) => setMyAsset(response.data));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getMyAssetData();
  // }, []);

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
      <MyAssetTotal
        myAsset={myAsset}
        live={live}
        getMyAssetData={getMyAssetData}
        getLiveData={getLiveData}
      />
      <br />
      <BasicModal getMyAssetData={getMyAssetData} />
      <br />
      <MyAssetItemList
        myAsset={myAsset}
        live={live}
        key={myAsset.uid}
        myassetremove={myAssetRemove}
        getMyAssetData={getMyAssetData}
        getLiveData={getLiveData}
      />
    </Box>
  );
}
