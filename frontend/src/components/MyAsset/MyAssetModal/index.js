// 보유 원화 모달창으로 입력하는 부분
import React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';


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
const BasicSelect = () => {
  const [currency, setCurrency] = React.useState('');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  console.log(currency)

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Currency Code</InputLabel>
        <Select
          id="currency_code"
          value={currency}
          label="currency_code"
          onChange={handleChange}
        >
          <MenuItem value='USD'>USD</MenuItem>
          <MenuItem value='EUR'>EUR</MenuItem>
          <MenuItem value='GBP'>GBP</MenuItem>
          <MenuItem value='CNY'>CNY</MenuItem>
          <MenuItem value='JPY'>JPY</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const enteredOnlyNumber = (val) => {
  return val.replace(/[^0-9]/g,'');
}

const addComma = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const deleteComma = (str) => {
  return str.replace(/,/g, "");
}

// 모달창
export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currency, setCurrency] = useState("")
  const [quantity, setQuantity] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);

  // 입력할때마다
  const handleChange = (e) => {
    setQuantity(e.target.value);
    console.log(e.target.value)
  };

  const handleSumit = (e) => {
    e.preventDefault(); //새로고침 방지
    // 아무것도 입력하지 않았을 때, submit 방지
    if (!quantity || !enteredAmount) return;
    props.onSubmit(quantity);
    setOpen(false); //submit 후 창 닫기
    setQuantity("");
    setEnteredAmount(""); //submit 후 textfield 창 비우기
    // console.log(quantity, enteredAmount)
  };

  const amountChangeHandler = (event) => {
    const isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value) ? true : false;
    setIsEnteredWrongAmount(isNotNumber);
    if (isNotNumber) return;

    const amount = addComma(enteredOnlyNumber(event.target.value));
    setEnteredAmount(amount);
};

  return (
    <div>
      <Button id="font_test" variant="contained" onClick={handleOpen}>
        보유 외화 추가하기
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* 모달창 내부 */}
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Box sx={{ m: 2 }}>
              {/* 보유 외화 title */}
              <Typography
                id="font_test"
                gutterBottom
                variant="h5"
                component="div"
              >
                보유 외화 등록
              </Typography>
              <BasicSelect value={currency}/>
            </Box>
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <TextField
                    name="quantity"
                    fullWidth
                    type="text"
                    value={quantity}
                    onChange={handleChange}
                    placeholder="보유하신 원화의 양을 입력하세요"
                    required
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs sx={{ mt:2}}>
                  <TextField
                    name="price"
                    fullWidth
                    type="text"
                    value={enteredAmount}
                    onChange={amountChangeHandler}
                    placeholder="구매한 금액을 입력하세요."
                    required
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
              <Button onClick={handleSumit}>Save</Button>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
