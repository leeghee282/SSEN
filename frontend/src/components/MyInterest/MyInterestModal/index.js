// 관심 화폐 모달창으로 입력하는 부분
import React from 'react';
import { useState } from 'react';
import axios from '../../../api/user';
import { baseURL } from '../../../api';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';

// 모달창 스타일
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// 국가 선택 select box
const BasicSelect = ({ nation, setNation }) => {
  const handleChange = (event) => {
    setNation(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">화폐</InputLabel>
        <Select
          id="currency_code"
          value={nation}
          label="currency_code"
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
  return val.replace(/[^0-9]/g, '');
};
// 천 단위 ',' 자동 입력을 위한 것
const addComma = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 모달창
export default function MyInterestModal({
  getInterest,
  handleOpen,
  open,
  setOpen,
}) {
  const [nation, setNation] = useState(''); //국가 선택
  const [previous, setPrevious] = useState(''); //이전 값
  const [interest, setInterest] = useState(''); //타겟
  const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);

  const handleClose = (e) => {
    setOpen(false);
    setNation('');
    setInterest('');
  };

  // 서버에 보유 통화 보내기(post 방식)
  const sendMyInterest = () => {
    const body = {
      code: nation,
      previous: previous,
      target: interest,
      userId: sessionStorage.getItem('userId'),
    };
    axios
      .post(baseURL + '/api/v1/intrcurr/', body)
      .then((response) => getInterest());
  };

  const handleSumit = (e) => {
    e.preventDefault(); //새로고침 방지
    // 아무것도 입력하지 않았을 때, submit 방지
    if (!nation || !interest) return;
    // props.onSubmit(nation, interest);
    setOpen(false); //submit 후 창 닫기
    setNation('');
    setInterest(''); //submit 후 textfield 창 비우기
    sendMyInterest();
  };

  // 천단위별 ',' 자동 입력 되게 하는 함수
  const amountInterest = (event) => {
    const isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value)
      ? true
      : false;
    setIsEnteredWrongAmount(isNotNumber);
    if (isNotNumber) return;

    const amount = addComma(enteredOnlyNumber(event.target.value));
    setInterest(amount);
  };

  // 소수점 입력
  const inputInterest = (event) => {
    const pattern = /^(\d{0,10}([.]\d{0,2})?)?$/;
    if (pattern.test(event.target.value)) {
      setInterest(event.target.value);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* 모달창 내부 */}
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Box sx={{ m: 2 }}>
              {/* 특이사항 title */}
              <Typography
                id="font_test"
                gutterBottom
                variant="h5"
                component="div"
              >
                관심 화폐 등록
              </Typography>
            </Box>
            <Box sx={{ m: 2 }}>
              <BasicSelect nation={nation} setNation={setNation} />
            </Box>
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <TextField
                    name="price"
                    fullWidth
                    type="text"
                    value={interest}
                    onChange={inputInterest}
                    placeholder="목표 금액을 입력하세요."
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
