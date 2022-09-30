import ReactApexChart from "react-apexcharts";

export default function MyAssetChart({
  myUSDTotal,
  myEURTotal,
  myGBPTotal,
  myCNYTotal,
  myJPYTotal,
}) {
  console.log(myUSDTotal, myEURTotal, "내 돈...");
  //도넛 차트 데이터 및 옵션
  const donutData = {
    series: [myUSDTotal, myEURTotal, myGBPTotal, myCNYTotal, myJPYTotal],
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 400,
        },
      ],
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
