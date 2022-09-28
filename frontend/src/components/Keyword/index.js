import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as d3 from "d3";
import cloud from "d3-cloud";

import { getKeywords, getNews } from "../../_actions/chart_action";

function Keyword(props) {
  const dispatch = useDispatch();

  const chartDates = useSelector((state) => state.chartReducer.chartDates);
  const startDate = moment(chartDates.startDate).format("YYYY-MM-DD");
  const endDate = moment(chartDates.endDate).format("YYYY-MM-DD");
  const keywordList = useSelector((state) => state.chartReducer.keywords);
  const newsList = useSelector((state) => state.chartReducer.news);
  const doing = useSelector((state) => state.chartReducer.doing);

  useEffect(() => {
    wordcloudHandler();
  }, []);

  useEffect(() => {
    wordcloudHandler();
  }, [doing]);

  const wordcloudData = [];

  const wordcloudHandler = async () => {
    await onSetKeywordsNews();
    setTimeout(function () {
      onSetWordcloud();
    }, 5000);
  };

  const onSetKeywordsNews = async () => {
    let keywordBody = {
      startDate: startDate,
      endDate: endDate,
    };

    await dispatch(getKeywords(keywordBody)).then((response) => {
      console.log(response.payload);
      response.payload.map((res) => {
        var addWordcloudData = {
          text: res.keyword,
          size: res.count,
        };
        return wordcloudData.push(addWordcloudData);
      });
    });
  };

  const onSetWordcloud = () => {
    var fill = d3.scaleOrdinal(d3.schemeCategory10);
    var wordScale = d3.scaleLinear().domain([0, 500]).range([0, 150]);
    var width = 400;
    var height = 300;

    d3.selectAll("svg").remove();

    cloud()
      .size([width, height])
      .words(wordcloudData)
      .padding(5)
      // .rotate(0)
      .rotate(function () {
        return ~~(Math.random() * 2) * 90;
      })
      .font("Impact")
      .fontSize(function (d) {
        return wordScale(d.size);
      })
      .on("end", end)
      .start();

    function end(words) {
      d3.select("#word-cloud")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .style("font-family", "Impact")
        .style("fill", function (d, i) {
          return fill(i);
        })
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
          return d.text;
        })
        .on("click", function (d) {
          console.log(d.target.__data__.text);
        });
      console.log(JSON.stringify(words));
    }
  };

  return (
    <div>
      <button onClick={wordcloudHandler}>하하</button>
      <div id="word-cloud"></div>
    </div>
  );
}

export default Keyword;
