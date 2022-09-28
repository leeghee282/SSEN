import React from "react";
import { useSelector } from "react-redux";

function News() {
  const newsList = useSelector((state) => state.chartReducer.news);

  return (
    <div>
      <p>{`${newsList}`}</p>
    </div>
  );
}

export default News;
