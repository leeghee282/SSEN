import React from 'react';
import Calendar from '../../components/Calendar';
import Chart from '../../components/Chart';
import Keyword from '../../components/Keyword';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import CommunityButton from '../../components/Community/CommunityButton';
import LiveCurrencyTable from '../../components/LiveCurrencyTable';

const MainCalendar = () => {
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
          <CommunityButton />
        </Grid>
      </Grid>
    </>
  );
};

export default MainCalendar;
