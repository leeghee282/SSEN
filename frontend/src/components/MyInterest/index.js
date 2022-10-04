import React, { useRef, useState, useEffect } from "react";
import MyInterestModal from "./MyInterestModal";
import MyInterestItemList from "./MyInterestItemList";
import axios from "../../api/user";
import { baseURL } from "../../api/index";
import "./style.css";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function MyInerest() {
  // 임시 데이터

  const [interests, setInterests] = useState([]);
  const [live, setLive] = useState([]);
  const [updateInts, setUpdateInts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  // 서버에서 관심화폐 받아오기(get방식)
  const getInterest = () => {
    axios
      .get(baseURL + `/api/v1/intrcurr/${sessionStorage.getItem("userId")}`)
      .then((response) => setInterests(response.data));
  };
  useEffect(() => {
    getInterest();
  }, []);

  useEffect(() => { }, [interests]);

  // 서버에서 실시간 환율 받아오기(get방식)
  const getLiveData = () => {
    axios.get(`/api/v1/live/`).then((response) => setLive(response.data));
  };
  useEffect(() => {
    getLiveData();
  }, []);

  useEffect(() => { }, [live]);

  // const onUpdate = (nation, interestCurrency) => {
  //   const updateInt = {
  //     nation,
  //     interestCurrency,
  //   };
  //   setUpdateInts(updateInts.concat(updateInt));
  // };

  // 삭제 기능
  const onRemove = (id) => {
    setInterests(interests.filter((interest) => interest.id !== id));
  };
  console.log(interests);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <h1 className="myInterest-titls, ff-b fs-myInterest-title fc-dark-grey">
        관심 화폐
      </h1>
      {interests.length !== 0 && (
        <button
          id="font_test"
          className="custom-btn btn-3"
          onClick={handleOpen}
        >
          <span>+ 관심 화폐 등록</span>
        </button>
      )}
      <MyInterestModal
        getInterest={getInterest}
        handleOpen={handleOpen}
        open={open}
        setOpen={setOpen}
      />
      <MyInterestItemList
        live={live}
        handleOpen={handleOpen}
        interests={interests}
        getInterest={getInterest}
        onRemove={onRemove}
      />
    </Box>
  );
}
