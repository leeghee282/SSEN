import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";

const EditPhoneNumber = (props) => {
  const { setUserPhoneNumber, userPhoneNumber, cancelClicked3 } = props;
  const [inputPhoneNumber, setInputPhoneNumber] = useState(userPhoneNumber);

  const onChange = (e) => {
    setInputPhoneNumber((inputPhoneNumber) => e.target.value);
  };

  const onClickHandler = () => {
    setUserPhoneNumber(inputPhoneNumber);
    cancelClicked3();
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <TextField
        id="font_test"
        defaultValue={userPhoneNumber}
        onChange={onChange}
        placeholder="전화번호를 변경하세요"
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
        onClick={cancelClicked3}
      >
        취소
      </Button>
    </Box>
  );
};

export default EditPhoneNumber;
