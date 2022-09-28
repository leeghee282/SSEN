import React, { useRef, useState, useEffect } from "react";
import MyInterestModal from "./MyInterestModal";
import MyInterestItemList from "./MyInterestItemList";
import axios from "../../api/user";
import { baseURL } from "../../api/index";
import { Button } from "@mui/material";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function MyInerest() {
  // 임시 데이터
  
  const [interests, setInterests] = useState([]);
  const [updateInts, setUpdateInts] = useState([]);
  const [open ,setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  
  

  const getInterest = () => {
    axios
      .get(baseURL + `/api/v1/intrcurr/${sessionStorage.getItem('userId')}`)
      .then((response) => setInterests(response.data));
  };
  useEffect(() => {
    getInterest();
  }, []);

  useEffect(() => {}, [interests]);

  

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
  console.log(interests)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography id="font_test" component="h1" variant="h4">
        관심 화폐 등록
      </Typography>
      {interests.length !== 0 && (
      <Button sx={{mt:3}}id="font_test" variant="contained" onClick={handleOpen}>
        관심 화폐 등록
      </Button>
      )}
      <br />
      <MyInterestModal getInterest={getInterest} handleOpen={handleOpen} open={open} setOpen={setOpen} />
      <br />
      <MyInterestItemList
        
        handleOpen={handleOpen}
        interests={interests}
        getInterest={getInterest}
        onRemove={onRemove}
        // onUpdate={onUpdate}
      />
    </Box>
  );
}
