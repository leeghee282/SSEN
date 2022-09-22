import React, { useState } from "react";
// react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
// react mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { useDispatch } from "react-redux";
import { getChartDates, getChartCode } from "../../_actions/chart_action";

// 나라 선택 라디오 버튼 컴포넌트
const RowRadioButtonsGroup = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("USD");

  const selectChange = (event) => {
    setType(event.target.value);

    let body = {
      code: event.target.value,
    };

    dispatch(getChartCode(body)).then((response) => {
      setType(response.payload);
    });
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Nation</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={type}
        onChange={selectChange}
      >
        <FormControlLabel value="USD" control={<Radio />} label="달러/원" />
        <FormControlLabel value="EUR" control={<Radio />} label="유로/원" />
        <FormControlLabel value="GBP" control={<Radio />} label="파운드/원" />
        <FormControlLabel value="JPY" control={<Radio />} label="엔/원" />
        <FormControlLabel value="CNY" control={<Radio />} label="위안/원" />
      </RadioGroup>
    </FormControl>
  );
};

// 날짜 선택 컴포넌트
const Calendar = () => {
  const dispatch = useDispatch();
  // 날짜 선택 버튼 만들기 위해서 선언한 것
  const DateFilterData = [
    {
      id: 1,
      value: "1개월",
    },
    {
      id: 2,
      value: "3개월",
    },
    {
      id: 3,
      value: "6개월",
    },
    {
      id: 4,
      value: "1년",
    },
  ];

  const today = new Date();
  const dayOfToday = today.getDate();
  const lastWeek = today.setDate(dayOfToday - 7);
  const [startDate, setStartDate] = useState(new Date(lastWeek));
  const [endDate, setEndDate] = useState(new Date());
  const [btnClicked, setBtnClicked] = useState("");

  // 날짜 버튼 클릭, 기간 변경 기능
  const handleBtnClicked = (e) => {
    const { value } = e.target;
    setBtnClicked(value);

    // 1개월 전부터 오늘까지의 기간
    if (value === "1개월") {
      const oneMonthAgo = new Date(
        endDate.getFullYear(),
        endDate.getMonth() - 1,
        endDate.getDate()
      );
      setStartDate(oneMonthAgo);

      let body = {
        startDate: oneMonthAgo,
        endDate: endDate,
      };

      dispatch(getChartDates(body)).then((response) => {
        console.log(response.payload);
      });
    } else if (value === "3개월") {
      const threeMonthAgo = new Date(
        endDate.getFullYear(),
        endDate.getMonth() - 3,
        endDate.getDate()
      );
      setStartDate(threeMonthAgo);

      let body = {
        startDate: threeMonthAgo,
        endDate: endDate,
      };

      dispatch(getChartDates(body)).then((response) => {
        console.log(response.payload);
      });
    } else if (value === "6개월") {
      const sixMonthAgo = new Date(
        endDate.getFullYear(),
        endDate.getMonth() - 6,
        endDate.getDate()
      );
      setStartDate(sixMonthAgo);

      let body = {
        startDate: sixMonthAgo,
        endDate: endDate,
      };

      dispatch(getChartDates(body)).then((response) => {
        console.log(response.payload);
      });
    } else if (value === "1년") {
      const lastYear = new Date(
        endDate.getFullYear() - 1,
        endDate.getMonth(),
        endDate.getDate()
      );
      setStartDate(lastYear);

      let body = {
        startDate: lastYear,
        endDate: endDate,
      };

      dispatch(getChartDates(body)).then((response) => {
        console.log(response.payload);
      });
    }
  };

  const onSetStartDate = (date) => {
    setStartDate(date);

    let body = {
      startDate: date,
      endDate: endDate,
    };

    dispatch(getChartDates(body)).then((response) => {
      console.log(response.payload);
    });
  };

  const onSetEndDate = (date) => {
    setEndDate(date);

    let body = {
      startDate: startDate,
      endDate: date,
    };

    dispatch(getChartDates(body)).then((response) => {
      console.log(response.payload);
    });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Stack spacing={2} direction="row">
            <DatePicker
              dateFormat="yyyy년 MM월 dd일"
              locale={ko}
              selected={startDate}
              onChange={(date) => onSetStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              dateFormat="yyyy년 MM월 dd일"
              locale={ko}
              selected={endDate}
              onChange={(date) => onSetEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
            {DateFilterData.map((e, idx) => (
              <Button
                variant="outlined"
                onClick={handleBtnClicked}
                key={idx}
                value={e.value}
              >
                {e.value}
              </Button>
            ))}
          </Stack>
          <RowRadioButtonsGroup />
        </Grid>
      </Box>
      <p>{`${startDate}`}</p>
      <p>{`${endDate}`}</p>
    </div>
  );
};

export default Calendar;
