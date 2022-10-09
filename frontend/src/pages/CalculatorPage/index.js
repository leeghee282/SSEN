import React, { useState } from 'react';
import ExchangeCalc from '../../components/ExchangeCalc';
import { Avatar, Typography, Box } from '@mui/material';

import './style.css';

function Calculator() {
  const [calc, setCalc] = useState([<ExchangeCalc />]);

  const addCalc = () => {
    setCalc(calc.concat(<ExchangeCalc />));
  };

  return (
    <div id="calc">
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <h1>환율계산기</h1>
        <Avatar
          sx={{
            mt: 3,
            ml: 2,
            width: 'auto',
            height: '30px',
            cursor: 'pointer',
          }}
          src="/images/questionlogo2.png"
          className="infobutton7"
        ></Avatar>
        <Typography
          sx={{ ml: 23, mt: 6 }}
          className="info7"
          id="font_test"
          fontSize="14px"
        >
          - 환율을 확인하고 싶은 날짜와 화폐를 선택합니다.<br></br>- 은행별
          우대율과 수수료를 알고 싶으면 은행을 선택합니다.<br></br>
          <br></br>* 환율 계산 기준가 : 종가
        </Typography>
      </Box>
      <div>
        <div className="calcdetail">{calc}</div>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <button onClick={addCalc} id="font_test" className="custom-btn btn-3">
            <span>추가 환율 계산하기</span>
          </button>
          <Avatar
            sx={{
              mt: 3,

              width: 'auto',
              height: '30px',
              cursor: 'pointer',
            }}
            src="/images/questionlogo2.png"
            className="infobutton7"
          ></Avatar>
          <Typography
            sx={{ ml: 22 }}
            className="info7"
            id="font_test"
            fontSize="14px"
          >
            - 다른 날짜 및 은행과 비교하고 싶을때 사용합니다.        
          </Typography>
        </Box>
      </div>
    </div>
  );
}

export default Calculator;
