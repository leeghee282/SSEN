// 보유화폐 총액 보여주는 컴포넌트
import React, { useEffect, useState } from "react";
import MyAssetChart from "../MyAssetChart";
import Grid from "@mui/material/Grid";
import "./style.css";

const MyAssetTotal = (props) => {
  const addComma = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const MyAssetForTotal = props.myAsset.map((asset) => {
    return asset.multi;
  });

  // 국가별 총 합계 새로 고침 없이 계산하기 위한 것 => 그래프
  const [USDTotal, setUSDTotal] = useState(0);
  const [EURTotal, setEURTotal] = useState(0);
  const [GBPTotal, setGBPTotal] = useState(0);
  const [CNYTotal, setCNYTotal] = useState(0);
  const [JPYTotal, setJPYTotal] = useState(0);

  useEffect(() => {
    const totalForGraph = {
      eachUSD: 0,
      eachEUR: 0,
      eachGBP: 0,
      eachCNY: 0,
      eachJPY: 0,
    };
    if (props.filteredItems.length > 0) {
      props.filteredItems.forEach((asset) => {
        if (asset.code === "USD") {
          totalForGraph.eachUSD += +asset.multi;
        } else if (asset.code === "EUR") {
          totalForGraph.eachEUR += +asset.multi;
        } else if (asset.code === "GBP") {
          totalForGraph.eachGBP += +asset.multi;
        } else if (asset.code === "CNY") {
          totalForGraph.eachCNY += +asset.multi;
        } else if (asset.code === "JPY") {
          totalForGraph.eachJPY += +asset.multi;
        }
      });
    }
    setUSDTotal(totalForGraph.eachUSD);
    setEURTotal(totalForGraph.eachEUR);
    setGBPTotal(totalForGraph.eachGBP);
    setCNYTotal(totalForGraph.eachCNY);
    setJPYTotal(totalForGraph.eachJPY);
  }, [props.filteredItems]);

  // 국가별 총 합계 새로 고침 없이 계산하기 위한 것
  const [nationTotal, setNationTotal] = useState(0);

  useEffect(() => {
    const total = { eachTotal: 0 };
    if (props.filteredItems.length > 0) {
      props.filteredItems.forEach((asset) => {
        if (asset.code === "USD") {
          total.eachTotal += +asset.multi;
        } else if (asset.code === "EUR") {
          total.eachTotal += +asset.multi;
        } else if (asset.code === "GBP") {
          total.eachTotal += +asset.multi;
        } else if (asset.code === "CNY") {
          total.eachTotal += +asset.multi;
        } else if (asset.code === "JPY") {
          total.eachTotal += +asset.multi;
        }
      });
    }
    setNationTotal(total.eachTotal);
  }, [props.filteredItems]);

  // 내 자산 국가별 총 합계 새로 고침 없이 계산하기 위한 것
  const [myUSDTotal, setMyUSDTotal] = useState(0);
  const [myEURTotal, setMyEURTotal] = useState(0);
  const [myGBPTotal, setMyGBPTotal] = useState(0);
  const [myCNYTotal, setMyCNYTotal] = useState(0);
  const [myJPYTotal, setMyJPYTotal] = useState(0);
  // USD
  useEffect(() => {
    const total = { USDTotal: 0 };
    if (props.myAsset.length > 0) {
      props.myAsset.forEach((asset) => {
        if (asset.code === "USD") {
          total.USDTotal += +asset.quantity;
        }
      });
    }
    setMyUSDTotal(total.USDTotal);
  }, [props.myAsset]);
  // EUR
  useEffect(() => {
    const total = { EURTotal: 0 };
    if (props.myAsset.length > 0) {
      props.myAsset.forEach((asset) => {
        if (asset.code === "EUR") {
          total.EURTotal += +asset.quantity;
        }
      });
    }
    setMyEURTotal(total.EURTotal);
  }, [props.myAsset]);
  // GBP
  useEffect(() => {
    const total = { GBPTotal: 0 };
    if (props.myAsset.length > 0) {
      props.myAsset.forEach((asset) => {
        if (asset.code === "GBP") {
          total.GBPTotal += +asset.quantity;
        }
      });
    }
    setMyGBPTotal(total.GBPTotal);
  }, [props.myAsset]);
  // CNY
  useEffect(() => {
    const total = { CNYTotal: 0 };
    if (props.myAsset.length > 0) {
      props.myAsset.forEach((asset) => {
        if (asset.code === "CNY") {
          total.CNYTotal += +asset.quantity;
        }
      });
    }
    setMyCNYTotal(total.CNYTotal);
  }, [props.myAsset]);
  // JPY
  useEffect(() => {
    const total = { JPYTotal: 0 };
    if (props.myAsset.length > 0) {
      props.myAsset.forEach((asset) => {
        if (asset.code === "JPY") {
          total.JPYTotal += +asset.quantity;
        }
      });
    }
    setMyJPYTotal(total.JPYTotal);
  }, [props.myAsset]);

  // 실시간 환율 새로고침 오류 해결
  const forUSD = props.live.length === 5 ? props.live[0].buyPrice : "none";
  const forJPY = props.live.length === 5 ? props.live[1].buyPrice : "none";
  const forEUR = props.live.length === 5 ? props.live[2].buyPrice : "none";
  const forGBP = props.live.length === 5 ? props.live[3].buyPrice : "none";
  const forCNY = props.live.length === 5 ? props.live[4].buyPrice : "none";

  const liveUSD = myUSDTotal * forUSD;
  const liveJPY = myJPYTotal * forJPY;
  const liveEUR = myEURTotal * forEUR;
  const liveGBP = myGBPTotal * forGBP;
  const liveCNY = myCNYTotal * forCNY;

  const All = liveUSD + liveJPY + liveEUR + liveGBP + liveCNY;

  //

  //가진 보유 화폐 구매 총 합계
  const Total = MyAssetForTotal.reduce((a, b) => a + b, 0);
  // 손익(실시간 환율 반영)
  const Calc = All - Total;

  return (
    <div>
      <div className="title">
        <h1 className="fs-normal fc-dark-grey">
          '{sessionStorage.getItem("name")}'님의 보유 외화 목록
        </h1>
        <strong className="fs-title fc-dark-grey">
          자산 현황 : {addComma(Total.toString())}원
        </strong>
      </div>
      <div className="detail">
        <div className="detail-box">
          {props.filterBaseCode === "All" && (
            <h1 className="fs-normal fc-grey">구매 금액</h1>
          )}
          {props.filterBaseCode === "USD" && (
            <h1 className="fs-normal fc-grey">구매 금액 (USD)</h1>
          )}
          {props.filterBaseCode === "EUR" && (
            <h1 className="fs-normal fc-grey">구매 금액 (EUR)</h1>
          )}
          {props.filterBaseCode === "GBP" && (
            <h1 className="fs-normal fc-grey">구매 금액 (GBP)</h1>
          )}
          {props.filterBaseCode === "CNY" && (
            <h1 className="fs-normal fc-grey">구매 금액 (CNY)</h1>
          )}
          {props.filterBaseCode === "JPY" && (
            <h1 className="fs-normal fc-grey">구매 금액 (JPY)</h1>
          )}
          <strong className="fs-title fc-green">
            {addComma(nationTotal.toString())}원
          </strong>
        </div>
        <div className="detail-box">
          <h1 className="fs-normal fc-grey">전체 손익</h1>
          {Calc >= 0 && (
            <strong className="fs-title fc-red">
              +{addComma(Calc.toFixed(2).toString())}원
            </strong>
          )}
          {Calc < 0 && (
            <strong className="fs-title fc-purple">
              {addComma(Calc.toFixed(2).toString())}원
            </strong>
          )}
        </div>
      </div>

      <MyAssetChart
        USDTotal={USDTotal}
        EURTotal={EURTotal}
        GBPTotal={GBPTotal}
        CNYTotal={CNYTotal}
        JPYTotal={JPYTotal}
      />
    </div>
  );
};

export default MyAssetTotal;
