import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";

export default function MyAssetChart({
  USDTotal,
  EURTotal,
  GBPTotal,
  CNYTotal,
  JPYTotal,
  renderusd,
            rendereur,
            rendergbp,
            rendercny,
            renderjpy,
}) {
  //도넛 차트 데이터 및 옵션
  const donutData = {
    series: [USDTotal, EURTotal, GBPTotal, CNYTotal, JPYTotal],

    options: {
      chart: {
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      // responsive: [
      //   {
      //     breakpoint: 400,
      //   },
      // ],
      // tooltip: {
      //   custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      //     return (
      //       '<div class="arrow_box">' +
      //       "<span>" +
      //       w.series.toFixed(2)[seriesIndex][dataPointIndex] +
      //       "</span>" +
      //       "</div>"
      //     );
      //   },
      // },

      plotOptions: {
        // pie: {
        //   donut: {
        //     labels: {
        //       show: true,
        //       total: {
        //         showAlways: true,
        //         show: true,
        //         label: "현재 보유 ",
        //         fontSize: "12px",
        //         color: "red",
        //       },
        //       value: {
        //         fontSize: "22px",
        //         show: true,
        //         color: "blue",
        //       },
        //     },
        //   },
        // },
      },
      labels: ["USD", "EUR", "GBP", "CNY", "JYP"],
      title: {
        text: "현재 보유 외화 통계",
        align: "center",
      },
    },
  };
  useEffect (()=>{

  },[rendercny,rendereur,rendergbp,renderusd,renderjpy]);

  
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={donutData.options}
          series={donutData.series}
          type="donut"
          width="500"
        />
      </div>
    </div>
  );
}
