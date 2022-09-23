import { useLayoutEffect, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import moment from "moment";

import { getData } from "../../_actions/chart_action";

function Chart(props) {
  useEffect(() => {
    onSetData();
  }, []);

  const dispatch = useDispatch();

  const currencyCode = useSelector((state) => state.chartReducer.chartCode);
  const chartDates = useSelector((state) => state.chartReducer.chartDates);
  const startDate = moment(chartDates.startDate).format("YYYY-MM-DD");
  const endDate = moment(chartDates.endDate).format("YYYY-MM-DD");
  const chartData = useSelector((state) => state.chartReducer.data);

  const onSetData = () => {
    let body = {
      startDate: startDate,
      endDate: endDate,
      code: currencyCode,
    };

    dispatch(getData(body)).then((response) => console.log(response.payload));
  };

  const onSetChart = () => {
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
    console.log(data);

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 20,
        }),
      })
    );

    // Create series
    var series = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        openValueYField: "openPrice",
        highValueYField: "highPrice",
        lowValueYField: "lowPrice",
        valueYField: "closePrice",
        valueXField: "regdate",
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
        "[bold]{valueX.formatDate()}[/]\nOpen: {openValueY}\nHigh: {highValueY}\nLow: {lowValueY}\nClose: {valueY}"
      );
    series.data.setAll(data);

    // Add cursor
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomXY",
        xAxis: xAxis,
      })
    );

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

  return (
    <div>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      <button onClick={onSetChart}>ddddd</button>
    </div>
  );
}

export default Chart;
