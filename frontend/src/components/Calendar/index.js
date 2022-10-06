import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';
// react-datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
// react mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useDispatch, useSelector } from 'react-redux';
import {
  getChartDates,
  getChartCode,
  getChartDetailDate,
} from '../../_actions/chart_action';
import { Avatar, Typography } from '@mui/material';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import CommunityButton from '../Community/CommunityButton';

import './style.css';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// 나라 선택 라디오 버튼 컴포넌트
const RowRadioButtonsGroup = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [type, setType] = useState('USD');

  const currencyCode = useSelector((state) => state.chartReducer.chartCode);

  useEffect(() => {
    setType(currencyCode);
  }, [location]);

  const selectChange = async (event) => {
    setType(event.target.value);
    console.log(type);

    let body = {
      code: event.target.value,
    };

    await dispatch(getChartCode(body)).then((response) => {
      setType(response.payload);
    });
  };

  return (
    <FormControl>
      {/* <FormLabel
        id="font_test"
        sx={{
          mt: 3,
          color: "rgba(0, 0, 0, 0.6)",
          height: "50px",
          fontWeight: "900",
          fontSize: "30px",
        }}
      >
        국가선택
      </FormLabel> */}
      <ToggleButtonGroup
        sx={{ mt: 3, width: '820px', height: '30px', color: 'black' }}
        row
        size="large"
        fullWidth="true"
        name="row-radio-buttons-group"
        value={type}
        onClick={selectChange}
      >
        <ToggleButton id="font_test" value="USD" control={<Radio />}>
          달러/원
        </ToggleButton>
        <ToggleButton id="font_test" value="EUR" control={<Radio />}>
          유로/원
        </ToggleButton>
        <ToggleButton id="font_test" value="GBP" control={<Radio />}>
          파운드/원
        </ToggleButton>
        <ToggleButton id="font_test" value="JPY" control={<Radio />}>
          엔/원
        </ToggleButton>
        <ToggleButton id="font_test" value="CNY" control={<Radio />}>
          위안/원
        </ToggleButton>
      </ToggleButtonGroup>
    </FormControl>
  );
};

// 날짜 선택 컴포넌트
const Calendar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const chartDetailDate = useSelector(
    (state) => state.chartReducer.chartDetailDate,
  );

  // 날짜 선택 버튼 만들기 위해서 선언한 것
  const DateFilterData = [
    {
      id: 1,
      value: '1개월',
    },
    {
      id: 2,
      value: '3개월',
    },
    {
      id: 3,
      value: '6개월',
    },
    {
      id: 4,
      value: '1년',
    },
  ];

  const today = new Date();
  const dayOfToday = today.getDate();
  const lastWeek = today.setDate(dayOfToday - 7);
  const [startDate, setStartDate] = useState(new Date(lastWeek));
  const [endDate, setEndDate] = useState(new Date());
  const [btnClicked, setBtnClicked] = useState('');

  useEffect(() => {
    setStartDate(new Date(chartDetailDate.startDetailDate));
    setEndDate(new Date(chartDetailDate.endDetailDate));
  }, [location]);

  // 날짜 버튼 클릭, 기간 변경 기능
  const handleBtnClicked = async (e) => {
    const { value } = e.target;
    setBtnClicked(value);

    // 1개월 전부터 오늘까지의 기간
    if (value === '1개월') {
      const oneMonthAgo = new Date(
        endDate.getFullYear(),
        endDate.getMonth() - 1,
        endDate.getDate(),
      );
      setStartDate(oneMonthAgo);

      let body = {
        startDate: oneMonthAgo,
        endDate: endDate,
      };

      await dispatch(getChartDates(body)).then((response) => {
        console.log(response.payload);
      });
    } else if (value === '3개월') {
      const threeMonthAgo = new Date(
        endDate.getFullYear(),
        endDate.getMonth() - 3,
        endDate.getDate(),
      );
      setStartDate(threeMonthAgo);

      let body = {
        startDate: threeMonthAgo,
        endDate: endDate,
      };

      await dispatch(getChartDates(body)).then((response) => {
        console.log(response.payload);
      });
    } else if (value === '6개월') {
      const sixMonthAgo = new Date(
        endDate.getFullYear(),
        endDate.getMonth() - 6,
        endDate.getDate(),
      );
      setStartDate(sixMonthAgo);

      let body = {
        startDate: sixMonthAgo,
        endDate: endDate,
      };

      await dispatch(getChartDates(body)).then((response) => {
        console.log(response.payload);
      });
    } else if (value === '1년') {
      const lastYear = new Date(
        endDate.getFullYear() - 1,
        endDate.getMonth(),
        endDate.getDate(),
      );
      setStartDate(lastYear);

      let body = {
        startDate: lastYear,
        endDate: endDate,
      };

      await dispatch(getChartDates(body)).then((response) => {
        console.log(response.payload);
      });
    }
  };

  const onSetStartDate = async (date) => {
    setStartDate(date);

    let body = {
      startDate: date,
      endDate: endDate,
    };

    await dispatch(getChartDates(body)).then((response) => {
      console.log(response.payload);
    });
  };

  const onSetEndDate = async (date) => {
    setEndDate(date);

    let body = {
      startDate: startDate,
      endDate: date,
    };

    await dispatch(getChartDates(body)).then((response) => {
      console.log(response.payload);
    });
  };

  return (
    <Box>
      <Grid container>
        <Typography
          component="h1"
          id="font_test"
          sx={{
            mt: 3,
            color: '#333',
            height: '40px',
            fontWeight: '900',
            fontSize: '30px',
          }}
        >
          환율 분석 차트
        </Typography>
        <Grid item xs={2}>
          <Avatar
            sx={{
              mt: 4,
              ml: 1,
              width: '30px',
              height: 'auto',
              cursor: 'pointer',
            }}
            src="/images/questionlogo2.png"
            className="infobutton"
          ></Avatar>
          <Box sx={{ ml: 3 }} className="info1">
            <Typography id="font_test" fontSize="14px">
              달러, 유로, 파운드, 엔, 위안 환율 정보를 제공합니다. <br></br>
              원하는 날짜 범위와 화폐를 선택한 다음 차트 적용하기를 눌러주세요.
              <br></br> 마우스 휠로 확대하거나 축소할 수 있습니다. <br></br>
              드래그를 통해 특정 범위만 뉴스 키워드 분석을 할 수 있습니다{' '}
              <br></br>
              <br></br>* S$EN 서비스는 1993년 1월 1일부터 환율 데이터를
              제공합니다.
            </Typography>
          </Box>
        </Grid>
        <Grid
          container
          sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid item xs={3}>
            {/* 3안에서 나누기*/}
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  id="font_test"
                  sx={{
                    width: 50,
                    fontSize: '14px',
                    display: 'flex',
                    height: '30px',
                    alignItems: 'center',
                  }}
                >
                  시작일{' '}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <DatePicker
                  className="calendar_datepicker"
                  id="font_test"
                  dateFormat="yyyy년 MM월 dd일"
                  locale={ko}
                  selected={startDate}
                  onChange={(date) => onSetStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            {/* 3안에서 나누기*/}
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  id="font_test"
                  sx={{
                    width: 50,
                    fontSize: '14px',
                    display: 'flex',
                    height: '30px',
                    alignItems: 'center',
                  }}
                >
                  최종일
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  className="calendar_datepicker"
                  id="font_test"
                  dateFormat="yyyy년 MM월 dd일"
                  locale={ko}
                  selected={endDate}
                  onChange={(date) => onSetEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} justifyContent="center">
            {DateFilterData.map((e, idx) => (
              <Button
                value={e.value}
                key={idx}
                variant="contained"
                id="font_test"
                size="small"
                sx={{ ml: 2.2 }}
                onClick={handleBtnClicked}
              >
                {e.value}
              </Button>
              // <button
              // className="custom2-btn btn-4"
              //   size="small"
              //   sx={{ ml: 2.2 }}
              //   id="font_test"
              //   variant="contained"
              //   onClick={handleBtnClicked}
              //   key={idx}
              //   value={e.value}
              // >
              //   <span>{e.value}</span>
              // </button>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <RowRadioButtonsGroup />
        </Grid>
      </Grid>
      {/* <Grid item xs={3} sx={{ml:7,pl:30}}>
            
            <CommunityButton ></CommunityButton>
            </Grid> */}
    </Box>
  );
};

export default Calendar;
