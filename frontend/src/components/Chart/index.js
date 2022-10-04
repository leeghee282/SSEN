import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Button,Grid } from '@mui/material';
import { useState } from 'react';
import axios from "../../api/user"
import { baseURL } from '../../api';

import {
  getData,
  doFn,
  getChartDetailDate,
  doDetailFn,
  getCurrDate,
} from '../../_actions/chart_action';

import useDidMountEffect from './useDidMountEffect';
const webSocket = new WebSocket("wss://j7e204.p.ssafy.io:8080/ssen");
function Chart() {
  const dispatch = useDispatch();

  const currencyCode = useSelector((state) => state.chartReducer.chartCode);
  const chartDates = useSelector((state) => state.chartReducer.chartDates);
  const startDate = moment(chartDates.startDate).format('YYYY-MM-DD');
  const endDate = moment(chartDates.endDate).format('YYYY-MM-DD');
  const rawChartData = useSelector((state) => state.chartReducer.data);
  const chartDetailDate = useSelector(
    (state) => state.chartReducer.chartDetailDate,
  );
  const chartCurrDate = useSelector(
    (state) => state.chartReducer.chartCurrDate,
  );
  
  //미국
  const [sellPrice1, setSellPrice1] = useState('');
  const [buyPrice1, setBuyPrice1] = useState('');
  const [highPrice1, setHighPrice1] = useState('');
  const [lowPrice1, setLowPrice1] = useState('');
  const [variance1, setVariance1] = useState('');
  const [variancePrice1, setVariancePrice1] = useState('');
  const [hour1, setHour1] = useState('');
  const [minute1, setMinute1] = useState('');
  const [second1, setSecond1] = useState('');
  const [cc1,setCc1] = useState('');
  //유로
  const [sellPrice2, setSellPrice2] = useState('');
  const [buyPrice2, setBuyPrice2] = useState('');
  const [highPrice2, setHighPrice2] = useState('');
  const [lowPrice2, setLowPrice2] = useState('');
  const [variance2, setVariance2] = useState('');
  const [variancePrice2, setVariancePrice2] = useState('');
  const [hour2, setHour2] = useState('');
  const [minute2, setMinute2] = useState('');
  const [second2, setSecond2] = useState('');
  const [cc2,setCc2] = useState('');

  //파운드
  const [sellPrice3, setSellPrice3] = useState('');
  const [buyPrice3, setBuyPrice3] = useState('');
  const [highPrice3, setHighPrice3] = useState('');
  const [lowPrice3, setLowPrice3] = useState('');
  const [variance3, setVariance3] = useState('');
  const [variancePrice3, setVariancePrice3] = useState('');
  const [hour3, setHour3] = useState('');
  const [minute3, setMinute3] = useState('');
  const [second3, setSecond3] = useState('');
  const [cc3,setCc3] = useState('');

  //엔
  const [sellPrice4, setSellPrice4] = useState('');
  const [buyPrice4, setBuyPrice4] = useState('');
  const [highPrice4, setHighPrice4] = useState('');
  const [lowPrice4, setLowPrice4] = useState('');
  const [variance4, setVariance4] = useState('');
  const [variancePrice4, setVariancePrice4] = useState('');
  const [hour4, setHour4] = useState('');
  const [minute4, setMinute4] = useState('');
  const [second4, setSecond4] = useState('');
  const [cc4,setCc4] = useState('');
  //위안
  const [sellPrice5,setSellPrice5] = useState('');
const [buyPrice5,setBuyPrice5] = useState('');
const [highPrice5,setHighPrice5] = useState('');
const [lowPrice5,setLowPrice5] = useState('');
const [variance5,setVariance5] = useState('');
const [variancePrice5,setVariancePrice5] = useState('');
const [hour5,setHour5] = useState('');
const [minute5,setMinute5] = useState('');
const [second5,setSecond5] = useState('');
const [cc5,setCc5] = useState('');


  useEffect(() => {
    onInitialSet();
  }, []);

  useEffect(() => {
    onSetData();
    // chartCurrDateHandler();
  }, [startDate, endDate, currencyCode]);

  useDidMountEffect(async () => {
    onDeleteChart('chartdiv');

    // let currBody = {
    //   startCurrDate: moment(chartDates.startDate).format('YYYY-MM-DD'),
    //   endCurrDate: moment(chartDates.endDate).format('YYYY-MM-DD'),
    // };

    // console.log(currBody);

    // dispatch(getCurrDate(currBody)).then((response) => {
    //   console.log(response.payload);
    // });

    let body = {
      startDate: moment(chartDates.startDate).format('YYYY-MM-DD'),
      endDate: moment(chartDates.endDate).format('YYYY-MM-DD'),
      code: currencyCode,
    };

    // let body = {
    //   startDate: moment(chartCurrDate.startCurrDate).format('YYYY-MM-DD'),
    //   endDate: moment(chartCurrDate.endCurrDate).format('YYYY-MM-DD'),
    //   code: currencyCode,
    // };
    console.log(body);

    await dispatch(getData(body)).then((response) => {
      if (response.payload) {
        let chartData = [];
        response.payload.map((data) => {
          var addChartData = {
            date: new Date(data.regdate).getTime(),
            open: data.openPrice,
            high: data.highPrice,
            low: data.lowPrice,
            close: data.closePrice,
          };
          return chartData.push(addChartData);
        });

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

        // Define data
        var data = chartData;

        // Create Y-axis
        var yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
          }),
        );
        if (data.length < 14) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        } else if (data.length < 19) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: 'day', count: 3 },
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        } else if (data.length < 30) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: 'day', count: 4 },
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        } else {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: 'day', count: 7 },
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        }

        // Create series
        var series = chart.series.push(
          am5xy.CandlestickSeries.new(root, {
            name: 'Series',
            xAxis: xAxis,
            yAxis: yAxis,
            openValueYField: 'open',
            highValueYField: 'high',
            lowValueYField: 'low',
            valueYField: 'close',
            valueXField: 'date',
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
            '[bold]{valueX.formatDate()}[/]\n시가: {openValueY}\n고가: {highValueY}\n저가: {lowValueY}\n종가: {valueY}',
          );
        series.data.setAll(data);

        var cursor = chart.set(
          'cursor',
          am5xy.XYCursor.new(root, {
            behavior: 'selectXY',
          }),
        );

        cursor.events.on('selectended', function (ev) {
          // Get actors
          var cursor = ev.target;

          // Get selection boundaries
          var x1 = xAxis
            .positionToDate(
              xAxis.toAxisPosition(cursor.getPrivate('downPositionX')),
            )
            .getTime();
          var x2 = xAxis
            .positionToDate(
              xAxis.toAxisPosition(cursor.getPrivate('positionX')),
            )
            .getTime();
          var y1 = yAxis.positionToValue(
            yAxis.toAxisPosition(cursor.getPrivate('downPositionY')),
          );
          var y2 = yAxis.positionToValue(
            yAxis.toAxisPosition(cursor.getPrivate('positionY')),
          );

          // Account for centering of bullets on a DateAxis
          var baseInterval = xAxis.getPrivate('baseInterval');
          var baseDuration =
            am5.time.getDuration(baseInterval.timeUnit, baseInterval.count) *
            series.get('locationX');
          x1 -= baseDuration;
          x2 -= baseDuration;

          // Assemble bounds
          var bounds = {
            left: x1 > x2 ? x2 : x1,
            right: x1 > x2 ? x1 : x2,
            top: y1 < y2 ? y1 : y2,
            bottom: y1 < y2 ? y2 : y1,
          };

          // Filter data items within boundaries
          var results = [];
          am5.array.each(series.dataItems, function (dataItem) {
            var x = dataItem.get('valueX');
            var y = dataItem.get('valueY');
            if (am5.math.inBounds({ x: x, y: y }, bounds)) {
              results.push(dataItem);
            }
          });

          // Results
          let selectedRange = [];
          results.map((data) => {
            var addSelectedData = {
              date: moment(new Date(data.close.valueX)).format('YYYY-MM-DD'),
            };
            return selectedRange.push(addSelectedData);
          });

          let newsBody = {
            startDetailDate: selectedRange[0].date,
            endDetailDate: selectedRange[selectedRange.length - 1].date,
          };

          console.log(newsBody);

          dispatch(getChartDetailDate(newsBody)).then((response) => {
            console.log(response.payload);
          });
        });

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
      }
    });
  }, [currencyCode]);

  const onInitialSet = () => {
    let body = {
      startDate: startDate,
      endDate: endDate,
      code: currencyCode,
    };

    let currBody = {
      startCurrDate: startDate,
      endCurrDate: endDate,
    };

    dispatch(getCurrDate(currBody));

    dispatch(getData(body)).then((response) => {
      if (response.payload) {
        let chartData = [];
        response.payload.map((data) => {
          var addChartData = {
            date: new Date(data.regdate).getTime(),
            open: data.openPrice,
            high: data.highPrice,
            low: data.lowPrice,
            close: data.closePrice,
          };
          return chartData.push(addChartData);
        });

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

        // Define data
        var data = chartData;

        // Create Y-axis
        var yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
          }),
        );
        if (data.length < 14) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        } else if (data.length < 19) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: 'day', count: 3 },
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        } else if (data.length < 30) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: 'day', count: 4 },
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        } else {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: 'day', count: 7 },
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        }

        // Create series
        var series = chart.series.push(
          am5xy.CandlestickSeries.new(root, {
            name: 'Series',
            xAxis: xAxis,
            yAxis: yAxis,
            openValueYField: 'open',
            highValueYField: 'high',
            lowValueYField: 'low',
            valueYField: 'close',
            valueXField: 'date',
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
            '[bold]{valueX.formatDate()}[/]\n시가: {openValueY}\n고가: {highValueY}\n저가: {lowValueY}\n종가: {valueY}',
          );
        series.data.setAll(data);

        var cursor = chart.set(
          'cursor',
          am5xy.XYCursor.new(root, {
            behavior: 'selectXY',
          }),
        );

        cursor.events.on('selectended', function (ev) {
          // Get actors
          var cursor = ev.target;

          // Get selection boundaries
          var x1 = xAxis
            .positionToDate(
              xAxis.toAxisPosition(cursor.getPrivate('downPositionX')),
            )
            .getTime();
          var x2 = xAxis
            .positionToDate(
              xAxis.toAxisPosition(cursor.getPrivate('positionX')),
            )
            .getTime();
          var y1 = yAxis.positionToValue(
            yAxis.toAxisPosition(cursor.getPrivate('downPositionY')),
          );
          var y2 = yAxis.positionToValue(
            yAxis.toAxisPosition(cursor.getPrivate('positionY')),
          );

          // Account for centering of bullets on a DateAxis
          var baseInterval = xAxis.getPrivate('baseInterval');
          var baseDuration =
            am5.time.getDuration(baseInterval.timeUnit, baseInterval.count) *
            series.get('locationX');
          x1 -= baseDuration;
          x2 -= baseDuration;

          // Assemble bounds
          var bounds = {
            left: x1 > x2 ? x2 : x1,
            right: x1 > x2 ? x1 : x2,
            top: y1 < y2 ? y1 : y2,
            bottom: y1 < y2 ? y2 : y1,
          };

          // Filter data items within boundaries
          var results = [];
          am5.array.each(series.dataItems, function (dataItem) {
            var x = dataItem.get('valueX');
            var y = dataItem.get('valueY');
            if (am5.math.inBounds({ x: x, y: y }, bounds)) {
              results.push(dataItem);
            }
          });

          // Results
          let selectedRange = [];
          results.map((data) => {
            var addSelectedData = {
              date: moment(new Date(data.close.valueX)).format('YYYY-MM-DD'),
            };
            return selectedRange.push(addSelectedData);
          });

          let newsBody = {
            startDetailDate: selectedRange[0].date,
            endDetailDate: selectedRange[selectedRange.length - 1].date,
          };

          console.log(newsBody);

          dispatch(getChartDetailDate(newsBody)).then((response) => {
            console.log(response.payload);
          });
        });

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
      }
    });
  };

  const onSetData = async () => {
    let body = {
      startDate: moment(chartCurrDate.startCurrDate).format('YYYY-MM-DD'),
      endDate: moment(chartCurrDate.endCurrDate).format('YYYY-MM-DD'),
      code: currencyCode,
    };
    await dispatch(getData(body)).then((response) => {
      console.log(response.payload);
    });
  };

  const onSetChart = async () => {
    let chartData = [];
    console.log(rawChartData);
    await rawChartData.map((data) => {
      var addChartData = {
        date: new Date(data.regdate).getTime(),
        open: data.openPrice,
        high: data.highPrice,
        low: data.lowPrice,
        close: data.closePrice,
      };
      return chartData.push(addChartData);
    });

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

    // Define data
    var data = chartData;

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );
    if (data.length < 14) {
      // Create X-Axis
      var xAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
          baseInterval: { timeUnit: 'day', count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 10,
          }),
        }),
      );
    } else if (data.length < 19) {
      // Create X-Axis
      var xAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
          groupData: true,
          groupInterval: { timeUnit: 'day', count: 3 },
          baseInterval: { timeUnit: 'day', count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 10,
          }),
        }),
      );
    } else if (data.length < 30) {
      // Create X-Axis
      var xAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
          groupData: true,
          groupInterval: { timeUnit: 'day', count: 4 },
          baseInterval: { timeUnit: 'day', count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 10,
          }),
        }),
      );
    } else {
      // Create X-Axis
      var xAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
          groupData: true,
          groupInterval: { timeUnit: 'day', count: 7 },
          baseInterval: { timeUnit: 'day', count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 10,
          }),
        }),
      );
    }

    // Create series
    var series = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        openValueYField: 'open',
        highValueYField: 'high',
        lowValueYField: 'low',
        valueYField: 'close',
        valueXField: 'date',
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
        '[bold]{valueX.formatDate()}[/]\n시가: {openValueY}\n고가: {highValueY}\n저가: {lowValueY}\n종가: {valueY}',
      );
    series.data.setAll(data);

    var cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'selectXY',
      }),
    );

    cursor.events.on('selectended', function (ev) {
      // Get actors
      var cursor = ev.target;

      // Get selection boundaries
      var x1 = xAxis
        .positionToDate(
          xAxis.toAxisPosition(cursor.getPrivate('downPositionX')),
        )
        .getTime();
      var x2 = xAxis
        .positionToDate(xAxis.toAxisPosition(cursor.getPrivate('positionX')))
        .getTime();
      var y1 = yAxis.positionToValue(
        yAxis.toAxisPosition(cursor.getPrivate('downPositionY')),
      );
      var y2 = yAxis.positionToValue(
        yAxis.toAxisPosition(cursor.getPrivate('positionY')),
      );

      // Account for centering of bullets on a DateAxis
      var baseInterval = xAxis.getPrivate('baseInterval');
      var baseDuration =
        am5.time.getDuration(baseInterval.timeUnit, baseInterval.count) *
        series.get('locationX');
      x1 -= baseDuration;
      x2 -= baseDuration;

      // Assemble bounds
      var bounds = {
        left: x1 > x2 ? x2 : x1,
        right: x1 > x2 ? x1 : x2,
        top: y1 < y2 ? y1 : y2,
        bottom: y1 < y2 ? y2 : y1,
      };

      // Filter data items within boundaries
      var results = [];
      am5.array.each(series.dataItems, function (dataItem) {
        var x = dataItem.get('valueX');
        var y = dataItem.get('valueY');
        if (am5.math.inBounds({ x: x, y: y }, bounds)) {
          results.push(dataItem);
        }
      });

      // Results
      let selectedRange = [];
      results.map((data) => {
        var addSelectedData = {
          date: moment(new Date(data.close.valueX)).format('YYYY-MM-DD'),
        };
        return selectedRange.push(addSelectedData);
      });

      let newsBody = {
        startDetailDate: selectedRange[0].date,
        endDetailDate: selectedRange[selectedRange.length - 1].date,
      };

      console.log(newsBody);

      dispatch(getChartDetailDate(newsBody)).then((response) => {
        console.log(response.payload);
      });
    });

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

  const onDeleteChart = async (divId) => {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root.dom.id === divId) {
        root.dispose();
      }
    });

    const newDiv = document.createElement('div');
    newDiv.id = 'chartdiv';
    const chart = document.getElementById('chart');
    chart.appendChild(newDiv);
  };

  const onMakeChart = async () => {
    onDeleteChart('chartdiv');

    let chartBody = {
      startDate: moment(chartDates.startDate).format('YYYY-MM-DD'),
      endDate: moment(chartDates.endDate).format('YYYY-MM-DD'),
      code: currencyCode,
    };

    await dispatch(getData(chartBody)).then((response) => {
      if (response.payload) {
        let chartData = [];
        response.payload.map((data) => {
          var addChartData = {
            date: new Date(data.regdate).getTime(),
            open: data.openPrice,
            high: data.highPrice,
            low: data.lowPrice,
            close: data.closePrice,
          };
          return chartData.push(addChartData);
        });

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

        // Define data
        var data = chartData;

        // Create Y-axis
        var yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
          }),
        );
        if (data.length < 14) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        } else if (data.length < 19) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: 'day', count: 3 },
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        } else if (data.length < 30) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: 'day', count: 4 },
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        } else {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: 'day', count: 7 },
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            }),
          );
        }

        // Create series
        var series = chart.series.push(
          am5xy.CandlestickSeries.new(root, {
            name: 'Series',
            xAxis: xAxis,
            yAxis: yAxis,
            openValueYField: 'open',
            highValueYField: 'high',
            lowValueYField: 'low',
            valueYField: 'close',
            valueXField: 'date',
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
            '[bold]{valueX.formatDate()}[/]\n시가: {openValueY}\n고가: {highValueY}\n저가: {lowValueY}\n종가: {valueY}',
          );
        series.data.setAll(data);

        var cursor = chart.set(
          'cursor',
          am5xy.XYCursor.new(root, {
            behavior: 'selectXY',
          }),
        );

        cursor.events.on('selectended', function (ev) {
          // Get actors
          var cursor = ev.target;

          // Get selection boundaries
          var x1 = xAxis
            .positionToDate(
              xAxis.toAxisPosition(cursor.getPrivate('downPositionX')),
            )
            .getTime();
          var x2 = xAxis
            .positionToDate(
              xAxis.toAxisPosition(cursor.getPrivate('positionX')),
            )
            .getTime();
          var y1 = yAxis.positionToValue(
            yAxis.toAxisPosition(cursor.getPrivate('downPositionY')),
          );
          var y2 = yAxis.positionToValue(
            yAxis.toAxisPosition(cursor.getPrivate('positionY')),
          );

          // Account for centering of bullets on a DateAxis
          var baseInterval = xAxis.getPrivate('baseInterval');
          var baseDuration =
            am5.time.getDuration(baseInterval.timeUnit, baseInterval.count) *
            series.get('locationX');
          x1 -= baseDuration;
          x2 -= baseDuration;

          // Assemble bounds
          var bounds = {
            left: x1 > x2 ? x2 : x1,
            right: x1 > x2 ? x1 : x2,
            top: y1 < y2 ? y1 : y2,
            bottom: y1 < y2 ? y2 : y1,
          };

          // Filter data items within boundaries
          var results = [];
          am5.array.each(series.dataItems, function (dataItem) {
            var x = dataItem.get('valueX');
            var y = dataItem.get('valueY');
            if (am5.math.inBounds({ x: x, y: y }, bounds)) {
              results.push(dataItem);
            }
          });

          // Results
          let selectedRange = [];
          results.map((data) => {
            var addSelectedData = {
              date: moment(new Date(data.close.valueX)).format('YYYY-MM-DD'),
            };
            return selectedRange.push(addSelectedData);
          });

          let newsBody = {
            startDetailDate: selectedRange[0].date,
            endDetailDate: selectedRange[selectedRange.length - 1].date,
          };

          console.log(newsBody);

          dispatch(getChartDetailDate(newsBody)).then((response) => {
            console.log(response.payload);
          });
        });

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
      }
    });

    // dispatch(doFn()).then((response) => {
    //   console.log("change");
    // });

    var body = {
      startDetailDate: moment(chartDates.startDate).format('YYYY-MM-DD'),
      endDetailDate: moment(chartDates.endDate).format('YYYY-MM-DD'),
    };
    console.log(body);

    await dispatch(getChartDetailDate(body)).then((response) => {
      console.log('이거');
      console.log(response.payload);

      var currBody = {
        startCurrDate: moment(chartDates.startDate).format('YYYY-MM-DD'),
        endCurrDate: moment(chartDates.endDate).format('YYYY-MM-DD'),
      };

      dispatch(getCurrDate(currBody)).then((response) => {
        console.log(response.payload);
      });
    });
  };

  const chartCurrDateHandler = async () => {
    let currBody = {
      startCurrDate: moment(chartDates.startDate).format('YYYY-MM-DD'),
      endCurrDate: moment(chartDates.endDate).format('YYYY-MM-DD'),
    };

    console.log(currBody);

    await dispatch(getCurrDate(currBody)).then((response) => {
      console.log('실행 외 안되');
      console.log(response.payload);
    });
  };

  const getStartData = async () =>{
    await axios
      .get(baseURL + "/api/v1/live")
      .then((response)=> {
        
        setSellPrice1(response.data[0].sellPrice)
        setBuyPrice1(response.data[0].buyPrice)
        setHighPrice1(response.data[0].highPrice)
        setLowPrice1(response.data[0].lowPrice)
        setVariance1(response.data[0].variance)
        setVariancePrice1(response.data[0].variancePrice)
        setHour1(response.data[0].hour)
        setMinute1(response.data[0].minute)
        setSecond1(response.data[0].second)
        
        setSellPrice4(response.data[1].sellPrice)
        setBuyPrice4(response.data[1].buyPrice)
        setHighPrice4(response.data[1].highPrice)
        setLowPrice4(response.data[1].lowPrice)
        setVariance4(response.data[1].variance)
        setVariancePrice4(response.data[1].variancePrice)
        setHour4(response.data[1].hour)
        setMinute4(response.data[1].minute)
        setSecond4(response.data[1].second)
      
        setSellPrice2(response.data[2].sellPrice)
        setBuyPrice2(response.data[2].buyPrice)
        setHighPrice2(response.data[2].highPrice)
        setLowPrice2(response.data[2].lowPrice)
        setVariance2(response.data[2].variance)
        setVariancePrice2(response.data[2].variancePrice)
        setHour2(response.data[2].hour)
        setMinute2(response.data[2].minute)
        setSecond2(response.data[2].second)
      
        setSellPrice3(response.data[3].sellPrice)
        setBuyPrice3(response.data[3].buyPrice)
        setHighPrice3(response.data[3].highPrice)
        setLowPrice3(response.data[3].lowPrice)
        setVariance3(response.data[3].variance)
        setVariancePrice3(response.data[3].variancePrice)
        setHour3(response.data[3].hour)
        setMinute3(response.data[3].minute)
        setSecond3(response.data[3].second)
      
        setSellPrice5(response.data[4].sellPrice)
        setBuyPrice5(response.data[4].buyPrice)
        setHighPrice5(response.data[4].highPrice)
        setLowPrice5(response.data[4].lowPrice)
        setVariance5(response.data[4].variance)
        setVariancePrice5(response.data[4].variancePrice)
        setHour5(response.data[4].hour)
        setMinute5(response.data[4].minute)
        setSecond5(response.data[4].second)})
      
  }

  ////////////웹소켓 시작
  
  webSocket.onopen = function () {console.log("1232323")};
  useEffect(() => {
    getStartData();
    
    // console.log(toChartType.toChartType,"체크필요")
  }, []);
  /////////////웹소켓 끝//////////////////

  webSocket.onmessage = function (message) {
    //======push 알림 시작==============
    // console.log(currencyCode,"현재통화")
    // console.log(message.data,12423)
    // console.log(toChartType.toChartType,"체크필요")
    if (message.data.includes('targetPrice')) {
      return;
    }
    //========실시간 환율 시작
    else {
      if (JSON.parse(message.data).cc2 === "USD" ) {
      //json형식으로 변환
      //   console.log(JSON.parse(message.data));
      // console.log(toChartType,"성공")
      
      setCc1(JSON.parse(message.data).cc2);
      setSellPrice1(JSON.parse(message.data).sellPrice);
      setBuyPrice1(JSON.parse(message.data).buyPrice);
      setHighPrice1(JSON.parse(message.data).highPrice);
      setLowPrice1(JSON.parse(message.data).lowPrice);
      setVariance1(JSON.parse(message.data).variance);
      setVariancePrice1(JSON.parse(message.data).variancePrice);
      setHour1(JSON.parse(message.data).regdate.time.hour);
      setMinute1(JSON.parse(message.data).regdate.time.minute);
      setSecond1(JSON.parse(message.data).regdate.time.second);
      //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
      // console.log(JSON.parse(message.data).regdate);
      
    }
    if (JSON.parse(message.data).cc2 === "EUR"){
      
      setCc2(JSON.parse(message.data).cc2);
      setSellPrice2(JSON.parse(message.data).sellPrice);
      setBuyPrice2(JSON.parse(message.data).buyPrice);
      setHighPrice2(JSON.parse(message.data).highPrice);
      setLowPrice2(JSON.parse(message.data).lowPrice);
      setVariance2(JSON.parse(message.data).variance);
      setVariancePrice2(JSON.parse(message.data).variancePrice);
      setHour2(JSON.parse(message.data).regdate.time.hour);
      setMinute2(JSON.parse(message.data).regdate.time.minute);
      setSecond2(JSON.parse(message.data).regdate.time.second);
      //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
      // console.log(JSON.parse(message.data).regdate);
      
    }
    if (JSON.parse(message.data).cc2 === "GBP"){
      setCc3(JSON.parse(message.data).cc2);
      setSellPrice3(JSON.parse(message.data).sellPrice);
      setBuyPrice3(JSON.parse(message.data).buyPrice);
      setHighPrice3(JSON.parse(message.data).highPrice);
      setLowPrice3(JSON.parse(message.data).lowPrice);
      setVariance3(JSON.parse(message.data).variance);
      setVariancePrice3(JSON.parse(message.data).variancePrice);
      setHour3(JSON.parse(message.data).regdate.time.hour);
      setMinute3(JSON.parse(message.data).regdate.time.minute);
      setSecond3(JSON.parse(message.data).regdate.time.second);
      //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
      // console.log(JSON.parse(message.data).regdate);
      
    }
    if (JSON.parse(message.data).cc2 === "JPY"){
      setCc4(JSON.parse(message.data).cc2);
      setSellPrice4(JSON.parse(message.data).sellPrice);
      setBuyPrice4(JSON.parse(message.data).buyPrice);
      setHighPrice4(JSON.parse(message.data).highPrice);
      setLowPrice4(JSON.parse(message.data).lowPrice);
      setVariance4(JSON.parse(message.data).variance);
      setVariancePrice4(JSON.parse(message.data).variancePrice);
      setHour4(JSON.parse(message.data).regdate.time.hour);
      setMinute4(JSON.parse(message.data).regdate.time.minute);
      setSecond4(JSON.parse(message.data).regdate.time.second);
      //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
      // console.log(JSON.parse(message.data).regdate);
      
    }
    if (JSON.parse(message.data).cc2 === "CNY"){
      setCc5(JSON.parse(message.data).cc2);
      setSellPrice5(JSON.parse(message.data).sellPrice);
      setBuyPrice5(JSON.parse(message.data).buyPrice);
      setHighPrice5(JSON.parse(message.data).highPrice);
      setLowPrice5(JSON.parse(message.data).lowPrice);
      setVariance5(JSON.parse(message.data).variance);
      setVariancePrice5(JSON.parse(message.data).variancePrice);
      setHour5(JSON.parse(message.data).regdate.time.hour);
      setMinute5(JSON.parse(message.data).regdate.time.minute);
      setSecond5(JSON.parse(message.data).regdate.time.second);
      //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
      // console.log(JSON.parse(message.data).regdate);
      
    }
    
    }
    
  };


  return (
    <div>
      <Grid container>
      <Grid item xs={2}>
      <Button
        id="font_test"
        sx={{ mt: 5, background: 'red', color: 'black', mb: 5 }}
        onClick={onMakeChart}
      >
        차트 적용하기
      </Button>
      </Grid>
      <Grid sx={{display:"flex",alignItems:"center"}}item xs={10}>
      <TableContainer component={Paper} sx={{minWidth: 400, width: 650 }}>
      <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
                국가
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>
                매도
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>
                매수
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>
                고가
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>
                저가
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>
                변동금액
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>
                변동 %{' '}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>
                시간
              </TableCell>
            </TableRow>
          </TableHead>
          {/*USD*/}
          <TableBody>
            
              <TableRow>
                <TableCell align="right">USD</TableCell>
                <TableCell align="right">{sellPrice1}</TableCell>
                <TableCell align="right">{buyPrice1}</TableCell>
                <TableCell align="right">{highPrice1}</TableCell>
                <TableCell align="right">{lowPrice1}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: variancePrice1 > 0 ? 'red' : 'blue' }}
                >
                  {variancePrice1}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: variance1 > 0 ? 'red' : 'blue' }}
                >
                  {variance1}
                </TableCell>
                <TableCell align="right">
                  {hour1}:{minute1}:{second1}
                </TableCell>
              </TableRow>
            
          </TableBody>
          {/*EUR*/}
          <TableBody>
            
              <TableRow>
                <TableCell align="right">EUR</TableCell>
                <TableCell align="right">{sellPrice2}</TableCell>
                <TableCell align="right">{buyPrice2}</TableCell>
                <TableCell align="right">{highPrice2}</TableCell>
                <TableCell align="right">{lowPrice2}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: variancePrice2 > 0 ? 'red' : 'blue' }}
                >
                  {variancePrice2}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: variance2 > 0 ? 'red' : 'blue' }}
                >
                  {variance2}
                </TableCell>
                <TableCell align="right">
                  {hour2}:{minute2}:{second2}
                </TableCell>
              </TableRow>
            
          </TableBody>
          {/*GBP*/}
          <TableBody>
            
              <TableRow>
                <TableCell align="right">GBP</TableCell>
                <TableCell align="right">{sellPrice3}</TableCell>
                <TableCell align="right">{buyPrice3}</TableCell>
                <TableCell align="right">{highPrice3}</TableCell>
                <TableCell align="right">{lowPrice3}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: variancePrice3 > 0 ? 'red' : 'blue' }}
                >
                  {variancePrice3}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: variance3 > 0 ? 'red' : 'blue' }}
                >
                  {variance3}
                </TableCell>
                <TableCell align="right">
                  {hour3}:{minute3}:{second3}
                </TableCell>
              </TableRow>
            
          </TableBody>
          {/*JPY*/}
          <TableBody>
            
              <TableRow>
                <TableCell align="right">JPY</TableCell>
                <TableCell align="right">{sellPrice4}</TableCell>
                <TableCell align="right">{buyPrice4}</TableCell>
                <TableCell align="right">{highPrice4}</TableCell>
                <TableCell align="right">{lowPrice4}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: variancePrice4 > 0 ? 'red' : 'blue' }}
                >
                  {variancePrice4}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: variance4 > 0 ? 'red' : 'blue' }}
                >
                  {variance4}
                </TableCell>
                <TableCell align="right">
                  {hour4}:{minute4}:{second4}
                </TableCell>
              </TableRow>
            
          </TableBody>
          {/*CNY*/}
          <TableBody>
            
              <TableRow>
                <TableCell align="right">CNY</TableCell>
                <TableCell align="right">{sellPrice5}</TableCell>
                <TableCell align="right">{buyPrice5}</TableCell>
                <TableCell align="right">{highPrice5}</TableCell>
                <TableCell align="right">{lowPrice5}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: variancePrice5 > 0 ? 'red' : 'blue' }}
                >
                  {variancePrice5}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: variance5 > 0 ? 'red' : 'blue' }}
                >
                  {variance5}
                </TableCell>
                <TableCell align="right">
                  {hour5}:{minute5}:{second5}
                </TableCell>
              </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      </Grid>
      <div id="chart">
        <div id="chartdiv" style={{ width: '800px', height: '300px' }}></div>
      </div>
    </div>
  );
}

export default Chart;
