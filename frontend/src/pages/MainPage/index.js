import React from "react";
import Calendar from "../../components/Calendar";
import Chart from "../../components/Chart";
import CommunityButton from "../../components/Community/CommunityButton";

const MainCalendar = () => {
  return (
    <>
      <Calendar />
      <Chart />
      <CommunityButton />
    </>
  );
};

export default MainCalendar;
