import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";

const EditNickname = (props) => {
  const { setUserNickName,userNickName, cancelClicked2 } = props;
  const [inputNickName,setInputNickName] = useState(userNickName);

  const onChange =(e) =>{
    setInputNickName((inputNickName)=>e.target.value);
    
  }

  const onClickHandler = () =>{
    setUserNickName(inputNickName);
    cancelClicked2();
  }

  return (
    <Box>
      <TextField
      onChange={onChange}
      placeholder="닉네임을 변경하세요"></TextField>
      <Button onClick={onClickHandler}>저장</Button> <Button onClick={cancelClicked2} >취소</Button>
    </Box>
  );
};

export default EditNickname;
