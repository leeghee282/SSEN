import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import moment from "moment";
import { Button } from "@mui/material";

import {
  getData,
  doFn,
  getChartDetailDate,
  doDetailFn,
} from "../../_actions/chart_action";

import useDidMountEffect from "./useDidMountEffect";

function Chart() {
  const dispatch = useDispatch();

  const currencyCode = useSelector((state) => state.chartReducer.chartCode);
  const chartDates = useSelector((state) => state.chartReducer.chartDates);
  const startDate = moment(chartDates.startDate).format("YYYY-MM-DD");
  const endDate = moment(chartDates.endDate).format("YYYY-MM-DD");
  const rawChartData = useSelector((state) => state.chartReducer.data);
  const chartDetailDate = useSelector(
    (state) => state.chartReducer.chartDetailDate
  );

  useEffect(() => {
    onInitialSet();
  }, []);

  useEffect(() => {
    onSetData();
  }, [startDate, endDate, currencyCode]);

  // useDidMountEffect(() => {
  //   dispatch(doDetailFn()).then((response) => {
  //     console.log("change");
  //   });
  // }, [chartDetailDate]);

  const onInitialSet = () => {
    let body = {
      startDate: startDate,
      endDate: endDate,
      code: currencyCode,
    };

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

        var root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);

        var chart = root.container.children.push(
          am5xy.XYChart.new(root, {
            panY: false,
            wheelY: "zoomX",
            layout: root.verticalLayout,
            maxtooltipDistance: 0,
          })
        );

        // Define data
        var data = chartData;

        // Create Y-axis
        var yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
          })
        );
        if (data.length < 14) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              baseInterval: { timeUnit: "day", count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            })
          );
        } else if (data.length < 19) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: "day", count: 3 },
              baseInterval: { timeUnit: "day", count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            })
          );
        } else if (data.length < 30) {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: "day", count: 4 },
              baseInterval: { timeUnit: "day", count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            })
          );
        } else {
          // Create X-Axis
          var xAxis = chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
              groupData: true,
              groupInterval: { timeUnit: "day", count: 7 },
              baseInterval: { timeUnit: "day", count: 1 },
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 10,
              }),
            })
          );
        }

        // Create series
        var series = chart.series.push(
          am5xy.CandlestickSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            openValueYField: "open",
            highValueYField: "high",
            lowValueYField: "low",
            valueYField: "close",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {}),
          })
        );

        series.columns.template.states.create("riseFromOpen", {
          fill: am5.color(0x76b041),
          stroke: am5.color(0x76b041),
        });
        series.columns.template.states.create("dropFromOpen", {
          fill: am5.color(0xe4572e),
          stroke: am5.color(0xe4572e),
        });

        series
          .get("tooltip")
          .label.set(
            "text",
            "[bold]{valueX.formatDate()}[/]\n시가: {openValueY}\n고가: {highValueY}\n저가: {lowValueY}\n종가: {valueY}"
          );
        series.data.setAll(data);

        var cursor = chart.set(
          "cursor",
          am5xy.XYCursor.new(root, {
            behavior: "selectXY",
          })
        );

        cursor.events.on("selectended", function (ev) {
          // Get actors
          var cursor = ev.target;

          // Get selection boundaries
          var x1 = xAxis
            .positionToDate(
              xAxis.toAxisPosition(cursor.getPrivate("downPositionX"))
            )
            .getTime();
          var x2 = xAxis
            .positionToDate(
              xAxis.toAxisPosition(cursor.getPrivate("positionX"))
            )
            .getTime();
          var y1 = yAxis.positionToValue(
            yAxis.toAxisPosition(cursor.getPrivate("downPositionY"))
          );
          var y2 = yAxis.positionToValue(
            yAxis.toAxisPosition(cursor.getPrivate("positionY"))
          );

          // Account for centering of bullets on a DateAxis
          var baseInterval = xAxis.getPrivate("baseInterval");
          var baseDuration =
            am5.time.getDuration(baseInterval.timeUnit, baseInterval.count) *
            series.get("locationX");
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
            var x = dataItem.get("valueX");
            var y = dataItem.get("valueY");
            if (am5.math.inBounds({ x: x, y: y }, bounds)) {
              results.push(dataItem);
            }
          });

          // Results
          let selectedRange = [];
          results.map((data) => {
            var addSelectedData = {
              date: moment(new Date(data.close.valueX)).format("YYYY-MM-DD"),
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
          "tooltip",
          am5.Tooltip.new(root, {
            themeTags: ["axis"],
          })
        );

        yAxis.set(
          "tooltip",
          am5.Tooltip.new(root, {
            themeTags: ["axis"],
          })
        );
      }
    });
  };

  const onSetData = () => {
    let body = {
      startDate: startDate,
      endDate: endDate,
      code: currencyCode,
    };
    dispatch(getData(body)).then((response) => {
      console.log(response.payload);
    });
  };

  const onSetChart = () => {
    let chartData = [];
    console.log(rawChartData);
    rawChartData.map((data) => {
      var addChartData = {
        date: new Date(data.regdate).getTime(),
        open: data.openPrice,
        high: data.highPrice,
        low: data.lowPrice,
        close: data.closePrice,
      };
      return chartData.push(addChartData);
    });

    var root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxtooltipDistance: 0,
      })
    );

    // Define data
    var data = chartData;

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    if (data.length < 14) {
      // Create X-Axis
      var xAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 10,
          }),
        })
      );
    } else if (data.length < 19) {
      // Create X-Axis
      var xAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
          groupData: true,
          groupInterval: { timeUnit: "day", count: 3 },
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 10,
          }),
        })
      );
    } else if (data.length < 30) {
      // Create X-Axis
      var xAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
          groupData: true,
          groupInterval: { timeUnit: "day", count: 4 },
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 10,
          }),
        })
      );
    } else {
      // Create X-Axis
      var xAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
          groupData: true,
          groupInterval: { timeUnit: "day", count: 7 },
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 10,
          }),
        })
      );
    }

    // Create series
    var series = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        openValueYField: "open",
        highValueYField: "high",
        lowValueYField: "low",
        valueYField: "close",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    series.columns.template.states.create("riseFromOpen", {
      fill: am5.color(0x76b041),
      stroke: am5.color(0x76b041),
    });
    series.columns.template.states.create("dropFromOpen", {
      fill: am5.color(0xe4572e),
      stroke: am5.color(0xe4572e),
    });

    series
      .get("tooltip")
      .label.set(
        "text",
        "[bold]{valueX.formatDate()}[/]\n시가: {openValueY}\n고가: {highValueY}\n저가: {lowValueY}\n종가: {valueY}"
      );
    series.data.setAll(data);

    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "selectXY",
      })
    );

    cursor.events.on("selectended", function (ev) {
      // Get actors
      var cursor = ev.target;

      // Get selection boundaries
      var x1 = xAxis
        .positionToDate(
          xAxis.toAxisPosition(cursor.getPrivate("downPositionX"))
        )
        .getTime();
      var x2 = xAxis
        .positionToDate(xAxis.toAxisPosition(cursor.getPrivate("positionX")))
        .getTime();
      var y1 = yAxis.positionToValue(
        yAxis.toAxisPosition(cursor.getPrivate("downPositionY"))
      );
      var y2 = yAxis.positionToValue(
        yAxis.toAxisPosition(cursor.getPrivate("positionY"))
      );

      // Account for centering of bullets on a DateAxis
      var baseInterval = xAxis.getPrivate("baseInterval");
      var baseDuration =
        am5.time.getDuration(baseInterval.timeUnit, baseInterval.count) *
        series.get("locationX");
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
        var x = dataItem.get("valueX");
        var y = dataItem.get("valueY");
        if (am5.math.inBounds({ x: x, y: y }, bounds)) {
          results.push(dataItem);
        }
      });

      // Results
      let selectedRange = [];
      results.map((data) => {
        var addSelectedData = {
          date: moment(new Date(data.close.valueX)).format("YYYY-MM-DD"),
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
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    yAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );
  };

  const onDeleteChart = (divId) => {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root.dom.id === divId) {
        root.dispose();
      }
    });

    const newDiv = document.createElement("div");
    newDiv.id = "chartdiv";
    const chart = document.getElementById("chart");
    chart.appendChild(newDiv);
  };

  const onMakeChart = () => {
    onDeleteChart("chartdiv");
    onSetChart();
    // dispatch(doFn()).then((response) => {
    //   console.log("change");
    // });

    var body = {
      startDetailDate: moment(chartDates.startDate).format("YYYY-MM-DD"),
      endDetailDate: moment(chartDates.endDate).format("YYYY-MM-DD"),
    };
    console.log(body);

    dispatch(getChartDetailDate(body)).then((response) => {
      console.log(response.payload);
    });
  };

  return (
    <div>
      <Button
        id="font_test"
        sx={{ mt: 5, background: "red", color: "black", mb: 5 }}
        onClick={onMakeChart}
      >
        차트 적용하기
      </Button>
      <div id="chart">
        <div id="chartdiv" style={{ width: "800px", height: "300px" }}></div>
      </div>
    </div>
  );
}

export default Chart;
