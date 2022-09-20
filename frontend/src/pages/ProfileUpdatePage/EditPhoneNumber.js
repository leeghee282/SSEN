import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";

const EditPhoneNumber = (props) => {
  const { setUserPhoneNumber,userPhoneNumber, cancelClicked3 } = props;
  const [inputPhoneNumber,setInputPhoneNumber] = useState(userPhoneNumber);
  

  const onChange =(e) =>{
    setInputPhoneNumber((inputPhoneNumber)=>e.target.value);
    
  }

  const onClickHandler = () =>{
    setUserPhoneNumber(inputPhoneNumber);
    cancelClicked3();
  }
  return (
    <Box>
      <TextField
      onChange={onChange}
      placeholder="전화번호를 변경하세요"></TextField>
      <Button onClick={onClickHandler}>저장</Button> <Button onClick={cancelClicked3}>취소</Button>
    </Box>
  );
};

export default EditPhoneNumber;
