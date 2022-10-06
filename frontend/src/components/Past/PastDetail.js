import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import moment from 'moment';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

import { Grid } from '@mui/material';

import Post from './Post';
import Paging from './Paging';

import {
  getPastCurrData,
  getPastKeywords,
  getPastNews,
} from '../../_actions/past_action';
import KeywordLoading from '../Loading/KeywordLoding';

function PastDetail() {
  const dispatch = useDispatch();
  const location = useLocation();

  const searchData = location.state.searchData;
  console.log(searchData);

  const pastData = useSelector((state) => state.pastReducer.pastData);
  const pastCurrData = useSelector((state) => state.pastReducer.pastCurrData);

  const [showKeyword, setShowKeyword] = useState('');

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [postPerPage] = useState(5);
  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const [keywordLoading, setKeywordLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);

  const currDataList = [];

  useEffect(() => {
    var currBody = {
      date: searchData.date,
      code: searchData.currencyCode,
    };

    dispatch(getPastCurrData(currBody)).then((response) => {
      console.log(response.payload);
      onInitialSet(response.payload);
      onSetKeywordNews();
    });
  }, [location]);

  const onInitialSet = (inputData) => {
    var data = [
      {
        code: searchData.currencyCode,
        open: inputData.openPrice,
        high: inputData.highPrice,
        low: inputData.lowPrice,
        close: inputData.closePrice,
      },
    ];

    var root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: 'zoomX',
        layout: root.verticalLayout,
        maxtooltipDistance: 0,
      }),
    );

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.2,
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'code',
      }),
    );
    xAxis.data.setAll(data);

    // Create series
    var series = chart.series.push(
      am5xy.OHLCSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        openValueYField: 'open',
        highValueYField: 'high',
        lowValueYField: 'low',
        valueYField: 'close',
        categoryXField: 'code',
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    series.columns.template.states.create('riseFromOpen', {
      fill: am5.color(0x76b041),
      stroke: am5.color(0x76b041),
    });
    series.columns.template.states.create('dropFromOpen', {
      fill: am5.color(0xe4572e),
      stroke: am5.color(0xe4572e),
    });

    series
      .get('tooltip')
      .label.set(
        'text',
        '시가: {openValueY}\n고가: {highValueY}\n저가: {lowValueY}\n종가: {valueY}',
      );
    series.data.setAll(data);

    var cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'selectY',
      }),
    );

    xAxis.set(
      'tooltip',
      am5.Tooltip.new(root, {
        themeTags: ['axis'],
      }),
    );

    yAxis.set(
      'tooltip',
      am5.Tooltip.new(root, {
        themeTags: ['axis'],
      }),
    );
  };

  const onSetKeywordNews = async () => {
    let keywordBody = {
      startDate: searchData.date,
      endDate: searchData.date,
    };
    d3.selectAll('svg').remove();

    setKeywordLoading(true);
    setNewsLoading(true);

    await dispatch(getPastKeywords(keywordBody)).then((response) => {
      const data = [];
      let sum = 0;
      console.log(response.payload);

      response.payload.map((res) => {
        var addWordcloudData = {
          text: res.keyword,
          size: res.count,
        };
        sum += res.count;
        return data.push(addWordcloudData);
      });

      setKeywordLoading(false);
      data.push(sum);
      onSetWordcloud(data);

      const maxNum = data.length - 1;
      const firstKeyword = data[maxNum].text;
      setShowKeyword(firstKeyword);
      console.log(firstKeyword);

      let newsBody = {
        keyword: firstKeyword,
        // startDate: startDate,
        // endDate: endDate,
      };

      dispatch(getPastNews(newsBody)).then((res) => {
        console.log(res.payload);
        setPosts(res.payload);
        setCurrentPage(1);
        indexOfLastPost = currentPage * postPerPage;
        indexOfFirstPost = indexOfLastPost - postPerPage;
        currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      });

      setNewsLoading(false);
    });
  };

  const onSetWordcloud = async (d) => {
    var fill = d3.scaleOrdinal(d3.schemeCategory10);
    var sum = d[10];
    var wordScale = d3
      .scaleLinear()
      .domain([0, sum])
      .range([0, 300 * 1.4]); //전체 사이즈 대비 차지하는 비율로 wordScale

    // var maxWordcloudNum = d.length - 2;
    // console.log("d", d);
    // var maxScaleNum = (parseInt(d[maxWordcloudNum].size / 100) + 2.8) * 100;
    // console.log(maxScaleNum);

    d.pop();

    var width = 400;
    var height = 300;

    cloud()
      .size([width, height])
      .words(d)
      .padding(5)
      // .rotate(0)
      .rotate(function () {
        return ~~(Math.random() * 2) * 90;
      })
      .font('MICEGothic Bold')
      .fontSize(function (d) {
        return wordScale(d.size);
      })
      .on('end', end)
      .start();

    function end(words) {
      d3.select('#word-cloud')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', function (d) {
          return d.size + 'px';
        })
        .style('font-family', 'MICEGothic Bold')
        .style('fill', function (d, i) {
          return fill(i);
        })
        .attr('text-anchor', 'middle')
        .attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        })
        .text(function (d) {
          return d.text;
        })
        .style('cursor', 'pointer')
        .on('click', function (d) {
          newsLoadingChange();
          onSetNews(d.target.__data__.text);
        });
      console.log(JSON.stringify(words));
    }

    const onSetNews = async (txt) => {
      setShowKeyword(txt);

      let newsBody = {
        keyword: txt,
        // startDate: startDate,
        // endDate: endDate,
      };

      await dispatch(getPastNews(newsBody)).then((response) => {
        console.log(response.payload);
        setPosts(response.payload);
        setCurrentPage(1);
        indexOfLastPost = currentPage * postPerPage;
        indexOfFirstPost = indexOfLastPost - postPerPage;
        currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      });

      newsLoadingChange();
    };

    const newsLoadingChange = () => {
      setNewsLoading((current) => !current);
    };
  };

  return (
    <Grid id="detailboard" item xs={12}>
      <Grid item xs={12}>
        <p className="past_title" id="font_test">
          <span>{`${searchData.date}`}</span>
          <span className="past_title-smaller"> 의 분석 결과</span>
          <p
            className="past_title-smaller"
            id="font_test"
          >{`일치율: ${searchData.similarity}%`}</p>
        </p>

        <Grid container>
          <Grid item xs={6}>
            <div id="chart">
              <div
                id="chartdiv"
                style={{ width: '500px', height: '300px' }}
              ></div>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={5}>
            {keywordLoading ? <KeywordLoading /> : null}
            <div id="word-cloud"></div>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <br></br>
          <Grid item xs={12}>
            <div className="newscontainer">
              <Post
                posts={currentPosts}
                loading={newsLoading}
                showKeyword={showKeyword}
              />
              <Paging
                totalCount={posts.length}
                postPerPage={postPerPage}
                postRangeDisplayed={5}
                handlePageChange={handlePageChange}
                page={currentPage}
                loading={newsLoading}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PastDetail;
