// 관심 화폐 모달창으로 입력하는 부분
import React from "react";
import { useState } from "react";

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
import axios from "../../../api/user";
import { baseURL } from "../../../api";
// 모달창 스타일


// 숫자만 입력 가능하게 해 놓은 것(0 입력 방지)
const enteredOnlyNumber = (val) => {
  return val.replace(/[^0-9]/g, "");
};
// 천 단위 ',' 자동 입력을 위한 것
const addComma = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 모달창
export default function MyInterestEdit(props) {

  const {details,handleClose2,getInterest} = props;
  
  const [editInterest,setEditInterest] = useState(details.target);
  const [nation, setNation] = useState("");
  const [interest, setInterest] = useState("");
  const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  

  

  const handleSumit = (e) => {
    e.preventDefault(); //새로고침 방지
    // 아무것도 입력하지 않았을 때, submit 방지
    if (!interest) return;
    // props.onSubmit(nation, interest);
    const editData = {
      
      
      previous : details.target,
      target : parseInt(interest.replaceAll(",", "")),
    }
    const addData = {
      previous : details.target,
      target : parseInt(interest.replaceAll(",", "")),
      userId : 'ssafy10',
      code : details.nation
    }
    if (details.target === 0 ) {
      axios
        .post(baseURL + "/api/v1/intrcurr/", addData)
        .then((response) => getInterest());
    }
    else {
      axios
        .patch(baseURL + `/api/v1/intrcurr/${details.uid}`, editData)
        .then((response) => getInterest());
    }

    handleClose2(); //submit 후 창 닫기
    
  };

  // 천단위별 ',' 자동 입력 되게 하는 함수(quantity)
  const amountInterest = (event) => {
    const isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value)
      ? true
      : false;
    setIsEnteredWrongAmount(isNotNumber);
    if (isNotNumber) return;

    const amount = addComma(enteredOnlyNumber(event.target.value));
    setInterest(amount);
  };
  

  return (
    
      
        <Box>
          {/* 모달창 내부 */}
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Box sx={{ m: 2 }}>
              {/* 특이사항 title */}
              <Typography
                id="font_test"
                gutterBottom
                variant="h5"
                component="div"
              >
                관심 화폐 수정
              </Typography>
            </Box>
            <Box sx={{ m: 2 ,mt:4}}>
              <Typography sx={{pl:0.5}}id="font_test" >화폐종류 : {details.nation}</Typography>
            </Box>
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <TextField
                    name="price"
                    fullWidth
                    type="text"
                    value={interest}
                    onChange={amountInterest}
                    placeholder="목표 금액을 입력하세요."
                    required
                  />
                </Grid>
              </Grid>
            </Box>
            <Stack mt={1} spacing={1} direction="row" justifyContent="center">
              <Button variant="contained" onClick={handleSumit} id="font_test">
                수정
              </Button>
              <Button variant="outlined" onClick={handleClose2} id="font_test">
                취소
              </Button>
            </Stack>
          </Box>
        </Box>
      
  );
}
