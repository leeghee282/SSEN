// 보유 원화 모달창으로 입력하는 부분
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../../../api/user";
import "./style.css";

//mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";

// 모달창 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// 국가 선택 select box
const BasicSelect = ({ code, setCode }) => {
  const handleChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">화폐 선택</InputLabel>
        <Select
          id="code_code"
          value={code}
          label="code_code"
          onChange={handleChange}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
          <MenuItem value="CNY">CNY</MenuItem>
          <MenuItem value="JPY">JPY</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

// 숫자만 입력 가능하게 해 놓은 것(0 입력 방지)
const enteredOnlyNumber = (val) => {
  return val.replace(/[^0-9]/g, "");
};
// 천 단위 ',' 자동 입력을 위한 것
const addComma = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 모달창
export default function BasicModal({ getMyAssetData }) {
  const [currCode, setCurrCode] = useState(""); //국가선택
  const [currQuantity, setCurrQuantity] = useState(""); //양
  const [currPrice, setCurrPrice] = useState(""); //구매 금액
  const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    setOpen(false);
    setCurrCode(""); //close 후 창 비우기
    setCurrQuantity("");
    setCurrPrice("");
  };

  // 서버에서 보유 통화 보내기(post 방식)
  const sendMyAsset = () => {
    const body = {
      code: currCode,
      quantity: parseInt(currQuantity.replaceAll(",", "")),
      price: currPrice,
      userId: sessionStorage.getItem("userId"),
    };
    axios.post("/api/v1/holdcurr", body).then((response) => getMyAssetData());
  };

  const handleSumit = (e) => {
    e.preventDefault(); //새로고침 방지
    if (!currCode || !currQuantity || !currPrice) return; // 아무것도 입력하지 않았을 때, submit 방지
    setOpen(false); //submit 후 창 닫기
    setCurrCode(""); //submit 창 비우기
    setCurrQuantity("");
    setCurrPrice("");
    sendMyAsset();
  };

  // 천단위별 ',' 자동 입력 되게 하는 함수(quantity)
  const amountQuantity = (event) => {
    const isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value)
      ? true
      : false;
    setIsEnteredWrongAmount(isNotNumber);
    if (isNotNumber) return;
    const amount = addComma(enteredOnlyNumber(event.target.value));
    setCurrQuantity(amount);
  };

  // 소수점 입력
  const inputPrice = (event) => {
    const pattern = /^(\d{0,10}([.]\d{0,2})?)?$/;
    if (pattern.test(event.target.value)) {
      setCurrPrice(event.target.value);
    }
  };

  return (
    <div>
      <button id="font_test" className="custom-btn btn-3" onClick={handleOpen}>
        <span>+ 보유 외화 등록</span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* 모달창 내부 */}
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            {/* 보유 외화 title */}
            <Typography
              id="font_test"
              gutterBottom
              variant="h5"
              component="div"
            >
              보유 외화 등록
            </Typography>
            <Box sx={{ m: 2 }}>
              <BasicSelect code={currCode} setCode={setCurrCode} />
            </Box>
            <Box sx={{ m: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <TextField
                    name="quantity"
                    fullWidth
                    type="text"
                    value={currQuantity}
                    onChange={amountQuantity}
                    placeholder="보유하신 원화의 양을 입력하세요"
                    required
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs sx={{ mt: 2 }}>
                  <TextField
                    name="price"
                    fullWidth
                    type="text"
                    value={currPrice}
                    onChange={inputPrice}
                    placeholder="구매한 금액을 입력하세요."
                    required
                  />
                </Grid>
              </Grid>
            </Box>
            <Stack mt={1} spacing={1} direction="row" justifyContent="center">
              <Button variant="contained" onClick={handleSumit} id="font_test">
                등록
              </Button>
              <Button variant="outlined" onClick={handleClose} id="font_test">
                취소
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
