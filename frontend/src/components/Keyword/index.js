import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as d3 from "d3";
import cloud from "d3-cloud";
import "./index.css";

import { getKeywords, getNews } from "../../_actions/chart_action";

import Post from "./Post";
import Pagination from "./Pagination";

import { Grid } from "@mui/material";

function Keyword(props) {
  const dispatch = useDispatch();

  const chartDates = useSelector((state) => state.chartReducer.chartDates);
  const startDate = moment(chartDates.startDate).format("YYYY-MM-DD");
  const endDate = moment(chartDates.endDate).format("YYYY-MM-DD");
  const keywordList = useSelector((state) => state.chartReducer.keywords);
  const newsList = useSelector((state) => state.chartReducer.news);
  const doing = useSelector((state) => state.chartReducer.doing);

  const chartDetailDate = useSelector(
    (state) => state.chartReducer.chartDetailDate
  );
  const startDetailDate = moment(chartDetailDate.startDate).format(
    "YYYY-MM-DD"
  );
  const endDetailDate = moment(chartDetailDate.endDate).format("YYYY-MM-DD");

  const doDetail = useSelector((state) => state.chartReducer.doDetail);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);

  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    wordcloudHandler();
  }, []);

  useEffect(() => {
    wordcloudHandler();
  }, [doing]);

  useEffect(() => {
    wordcloudDetailHandler();
  }, [doDetail]);

  const wordcloudData = [];

  const wordcloudHandler = async () => {
    await onSetKeywordsNews();
    setTimeout(function () {
      onSetWordcloud();
    }, 1000);
  };

  // const wordcloudDetailHandler = async () => {
  //   await onSetDetailKeywordsNews();
  //   setTimeout(function () {
  //     onSetWordcloud();
  //   }, 1000);
  // };

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

    const firstKeyword = await wordcloudData[0].text;
    let newsBody = {
      keyword: firstKeyword,
      startDate: startDate,
      endDate: endDate,
    };
    setLoading(true);
    await dispatch(getNews(newsBody)).then((response) => {
      console.log(response.payload);
      setPosts(response.payload);
      setCurrentPage(1);
      indexOfLastPost = currentPage * postPerPage;
      indexOfFirstPost = indexOfLastPost - postPerPage;
      currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    });
    setLoading(false);
  };

  const paginate = (pageNum) => setCurrentPage(pageNum);

  const onSetWordcloud = () => {
    var fill = d3.scaleOrdinal(d3.schemeCategory10);
    if (wordcloudData[0].size <= 100) {
      var wordScale = d3.scaleLinear().domain([0, 100]).range([0, 150]);
    } else if (wordcloudData[0].size <= 200) {
      var wordScale = d3.scaleLinear().domain([0, 200]).range([0, 150]);
    } else if (wordcloudData[0].size <= 300) {
      var wordScale = d3.scaleLinear().domain([0, 300]).range([0, 150]);
    } else if (wordcloudData[0].size <= 400) {
      var wordScale = d3.scaleLinear().domain([0, 400]).range([0, 150]);
    } else {
      var wordScale = d3.scaleLinear().domain([0, 500]).range([0, 150]);
    }
    var width = 300;
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
        .style("cursor", "pointer")
        .on("click", function (d) {
          console.log(d.target.__data__.text);
          onSetNews(d.target.__data__.text);
        });
      console.log(JSON.stringify(words));
    }

    const onSetNews = (txt) => {
      let newsBody = {
        keyword: txt,
        startDate: startDate,
        endDate: endDate,
      };

      dispatch(getNews(newsBody)).then((response) => {
        console.log(response.payload);
        setPosts(response.payload);
        setCurrentPage(1);
        indexOfLastPost = currentPage * postPerPage;
        indexOfFirstPost = indexOfLastPost - postPerPage;
        currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      });
    };
  };

  const onSetDetailKeywordsNews = async () => {
    let keywordBody = {
      startDate: startDetailDate,
      endDate: endDetailDate,
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

    const firstKeyword = await wordcloudData[0].text;
    let newsBody = {
      keyword: firstKeyword,
      startDate: startDate,
      endDate: endDate,
    };
    setLoading(true);
    await dispatch(getNews(newsBody)).then((response) => {
      console.log(response.payload);
      setPosts(response.payload);
      setCurrentPage(1);
      indexOfLastPost = currentPage * postPerPage;
      indexOfFirstPost = indexOfLastPost - postPerPage;
      currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    });
    setLoading(false);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <div id="word-cloud"></div>
        </Grid>
        <Grid item xs={7}>
          <div className="container">
            <Post posts={currentPosts} />
            <Pagination
              postPerPage={postPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Keyword;
