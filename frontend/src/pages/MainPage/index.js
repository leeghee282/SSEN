import React from "react";
import Calendar from "../../components/Calendar";
import Chart from "../../components/Chart";
import Keyword from "../../components/Keyword";
import News from "../../components/News";
import CommunityButton from "../../components/Community/CommunityButton";

const MainCalendar = () => {
  return (
    <>
      <Calendar />
      <Chart />
      <CommunityButton />
      <Keyword />
      <News />
    </>
  );
};

export default MainCalendar;
