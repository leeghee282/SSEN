import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";
const EditName = (props) => {
  const { setUserName, userName, cancelClicked } = props;
  const [inputName, setInputName] = useState(userName);

  const onChange = (e) => {
    setInputName((inputName) => e.target.value);
  };

  const onClickHandler = () => {
    setUserName(inputName);
    cancelClicked();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <TextField
        id="font_test"
        onChange={onChange}
        defaultValue={userName}
        placeholder="이름을 변경하세요"
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
        onClick={cancelClicked}
      >
        취소
      </Button>
    </Box>
  );
};

export default EditName;
