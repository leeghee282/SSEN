import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";
const EditName = (props) => {
  const { setUserName,userName, cancelClicked } = props;
  const [inputName,setInputName] = useState(userName);

  const onChange =(e) =>{
    setInputName((inputName)=>e.target.value);
    
  }

  const onClickHandler = () =>{
    setUserName(inputName);
    cancelClicked();
  }

  return (
    <Box>
      <TextField
        onChange={onChange}
        placeholder="이름을 변경하세요"
      ></TextField>
      <Button onClick={onClickHandler}>저장</Button> <Button onClick={cancelClicked}>취소</Button>
    </Box>
  );
};

export default EditName;
