import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function Chart(props) {
  const currencyCode = useSelector((state) => state.chartReducer.chartCode);
  console.log(currencyCode);
  useLayoutEffect(() => {
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
    var data = [
      {
        date: new Date(2021, 0, 1).getTime(),
        open: 1200,
        high: 1205,
        low: 1198,
        close: 1202,
      },
      {
        date: new Date(2021, 0, 2).getTime(),
        open: 1204,
        high: 1204,
        low: 1197,
        close: 1199,
      },
      {
        date: new Date(2021, 0, 3).getTime(),
        open: 1188,
        high: 1191,
        low: 1183,
        close: 1189,
      },
      {
        date: new Date(2021, 0, 4).getTime(),
        open: 1194,
        high: 1197,
        low: 1189,
        close: 1195,
      },
      {
        date: new Date(2021, 0, 5).getTime(),
        open: 1189,
        high: 1198,
        low: 1189,
        close: 1196,
      },
      {
        date: new Date(2021, 0, 6).getTime(),
        open: 1197,
        high: 1200,
        low: 1196,
        close: 1196,
      },
      {
        date: new Date(2021, 0, 7).getTime(),
        open: 1207,
        high: 1208,
        low: 1202,
        close: 1202,
      },
      {
        date: new Date(2021, 0, 8).getTime(),
        open: 1212,
        high: 1213,
        low: 1206,
        close: 1209,
      },
      {
        date: new Date(2021, 0, 9).getTime(),
        open: 1206,
        high: 1208,
        low: 1197,
        close: 1201,
      },
    ];

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
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
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}

export default Chart;
