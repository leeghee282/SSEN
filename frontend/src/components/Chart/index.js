import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';

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
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import axios from '../../api/user';
import { baseURL } from '../../api';

import Keyword from '../Keyword';
import Calendar from '../Calendar';
import LiveCurrencyTable from '../LiveCurrencyTable';

import {
  getData,
  doFn,
  getChartDetailDate,
  doDetailFn,
  getCurrDate,
} from '../../_actions/chart_action';

import useDidMountEffect from './useDidMountEffect';
const webSocket = new WebSocket('wss://j7e204.p.ssafy.io:8080/ssen');
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
  const [cc1, setCc1] = useState('');
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
  const [cc2, setCc2] = useState('');

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
  const [cc3, setCc3] = useState('');

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
  const [cc4, setCc4] = useState('');
  //위안
  const [sellPrice5, setSellPrice5] = useState('');
  const [buyPrice5, setBuyPrice5] = useState('');
  const [highPrice5, setHighPrice5] = useState('');
  const [lowPrice5, setLowPrice5] = useState('');
  const [variance5, setVariance5] = useState('');
  const [variancePrice5, setVariancePrice5] = useState('');
  const [hour5, setHour5] = useState('');
  const [minute5, setMinute5] = useState('');
  const [second5, setSecond5] = useState('');
  const [cc5, setCc5] = useState('');

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
          fill: am5.color(0xff5b5b),
          stroke: am5.color(0xff5b5b),
        });
        series.columns.template.states.create('dropFromOpen', {
          fill: am5.color(0x5d5fef),
          stroke: am5.color(0x5d5fef),
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
          fill: am5.color(0xff5b5b),
          stroke: am5.color(0xff5b5b),
        });
        series.columns.template.states.create('dropFromOpen', {
          fill: am5.color(0x5d5fef),
          stroke: am5.color(0x5d5fef),
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
            tooltip: am5.Tooltip.new(root, { fontFamily: 'MICEGothic Bold' }),
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

  return (
    <div className="chart_box">
      <Calendar />
      <button id="font_test" className="custom-btn btn-3" onClick={onMakeChart}>
        <span>차트 적용하기</span>
      </button>
      <div id="chart">
        <div id="chartdiv" style={{ width: '800px', height: '300px' }}></div>
      </div>
    </div>
  );
}

export default Chart;
