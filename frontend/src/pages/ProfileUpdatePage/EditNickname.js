import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";
import useWordCloud from "../../components/WordCloud";

const EditNickname = (props) => {
  const { setUserNickName, userNickName, cancelClicked2 } = props;
  const [inputNickName, setInputNickName] = useState(userNickName);

  const onChange = (e) => {
    setInputNickName((inputNickName) => e.target.value);
  };

  const onClickHandler = () => {
    setUserNickName(inputNickName);
    cancelClicked2();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <TextField
        id="font_test"
        onChange={onChange}
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
        onClick={cancelClicked2}
      >
        취소
      </Button>
      
    </Box>
  );
};

export default EditNickname;
