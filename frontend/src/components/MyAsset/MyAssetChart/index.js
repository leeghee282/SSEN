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
      labels: ["USD", "EUR", "GBP", "CNY", "JYP"],
      title: {
        text: "현재 보유 외화 통계",
        align: "center",
        style: {
          fontFamily: 'MICEGothic Bold'
        },
      },
    },
  };
  useEffect(() => { }, [rendercny, rendereur, rendergbp, renderusd, renderjpy]);

  return (
    <div id="chart" style={{ margin: 0, padding: 0, marginLeft: 150 }}>
      <ReactApexChart
        options={donutData.options}
        series={donutData.series}
        type="donut"
        width={350}
        height={350}
      />
    </div>
  );
}
