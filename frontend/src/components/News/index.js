import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { getNews } from "../../_actions/chart_action";

function News() {
  // const dispatch = useDispatch();
  // const chartDates = useSelector((state) => state.chartReducer.chartDates);
  // const startDate = moment(chartDates.startDate).format("YYYY-MM-DD");
  // const endDate = moment(chartDates.endDate).format("YYYY-MM-DD");
  // const keywordList = useSelector((state) => state.chartReducer.keywords);
  // const newsList = useSelector((state) => state.chartReducer.news);
  // const [keyword, setKeyword] = useState("");
  // useEffect(() => {
  //   onSetNews();
  // }, [keywordList]);
  // const onSetNews = () => {
  //   setKeyword(keywordList);
  //   console.log(keyword);
  //   let body = {
  //     keyword: keyword,
  //     startDate: startDate,
  //     endDate: endDate,
  //   };
  //   dispatch(getNews(body)).then((response) => {
  //     console.log(response.payload);
  //   });
  // };
  // return (
  //   <div>
  //     <p>{`${newsList}`}</p>
  //   </div>
  // );
}

export default News;
