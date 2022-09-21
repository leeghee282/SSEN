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

// 나라 선택 라디오 버튼 컴포넌트
const RowRadioButtonsGroup = () => {
  const [type, setType] = useState("USD");
  const selectChange = (event) => {
    setType(event.target.value);
  };
  console.log(type);
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
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
      );
      setStartDate(oneMonthAgo);
      setEndDate(new Date());
    }
    // 3개월 전부터 오늘까지의 기간
    if (value === "3개월") {
      const threeMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 3,
        new Date().getDate()
      );
      setStartDate(threeMonthAgo);
      setEndDate(new Date());
    }
    if (value === "6개월") {
      const sixMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 6,
        new Date().getDate()
      );
      setStartDate(sixMonthAgo);
      setEndDate(new Date());
    }
    if (value === "1년") {
      const lastYear = new Date(
        new Date().getFullYear() - 1,
        new Date().getMonth(),
        new Date().getDate()
      );
      setStartDate(lastYear);
      setEndDate(new Date());
    }
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
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              dateFormat="yyyy년 MM월 dd일"
              locale={ko}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
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
    </div>
  );
};

export default Calendar;
