import React from "react";
import Calendar from "../../components/Calendar";
import Chart from "../../components/Chart/index";
import SimpleWordcloud from "../../components/WordCloud";

const MainCalendar = () => {
  return (
    <>
      <Calendar />
      <Chart />
      <SimpleWordcloud />
    </>
  );
};

export default MainCalendar;
