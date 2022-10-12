import Calendar from '../../components/Calendar';
import Chart from '../../components/Chart';
import Keyword from '../../components/Keyword';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import CommunityButton from '../../components/Community/CommunityButton';
import LiveCurrencyTable from '../../components/LiveCurrencyTable';
import React, { useRef, useState, useEffect } from 'react';

const MainCalendar = () => {
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);
  function handleScroll() {
    if (ScrollY > 30) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }
  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  return (
    <>
      <Grid container spacing={2} sx={{ width: 'fit-content' }}>
        <Grid item xs={9}>
          {/* <Calendar /> */}
          <Chart />
          <Keyword />
        </Grid>
        <Grid item xs={3}>
          <LiveCurrencyTable />
          <br />
          <CommunityButton ScrollActive={ScrollActive} ScrollY={ScrollY} />
        </Grid>
      </Grid>
    </>
  );
};

export default MainCalendar;
