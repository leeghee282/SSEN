import React from "react";
import Calendar from "../../components/Calendar";
import Chart from "../../components/Chart";
import Keyword from "../../components/Keyword";
import News from "../../components/News";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CommunityButton from "../../components/Community/CommunityButton";



const MainCalendar = () => {
  return (
    <>
      <Grid container={2} sx={{width:"fit-content"}} >
      <Grid item xs={9}>
      <Calendar />
      
      <Chart />
      
      
      <Keyword />
      <News />
      </Grid>
      <Grid item xs={3}>
        <CommunityButton></CommunityButton>
      </Grid>
      </Grid>
    
    </>
  );
};

export default MainCalendar;
