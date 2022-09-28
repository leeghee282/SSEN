import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "../../api/user";
import { baseURL } from "../../api";

const EditNickname = (props) => {
  const { setTotalData, totalData, cancelClicked2, cancelClicked22 } = props;
  
  

  const onChange = (e) => {
    setTotalData({...totalData, nickname: e.target.value})
    
  };

  const onClickHandler = () => {
    axios
      .put(baseURL + '/api/v1/user/edit', totalData)
      .then((response) => {console.log(response)
      if(response.status ===200 ){
        sessionStorage.setItem('nickname',totalData.nickname)
      }})
    cancelClicked2();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <TextField
        id="font_test"
        onChange={onChange}
        defaultValue={totalData.nickname}
        placeholder="닉네임을 변경하세요"
      ></TextField>
      <Button
        id="font_test"
        sx={{ ml: 6, color: "#3C3C3D", background: "#F3F6FA" }}
        onClick={onClickHandler}
      >
        저장
      </Button>{" "}
      <Button
        id="font_test"
        sx={{ ml: 1, color: "red", background: "#F3F6FA" }}
        onClick={cancelClicked22}
      >
        취소
      </Button>
      
    </Box>
  );
};

export default EditNickname;
