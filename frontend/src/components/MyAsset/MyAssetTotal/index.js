// 보유화폐 총액 보여주는 컴포넌트
import React, { useEffect, useState } from 'react';
import MyAssetChart from '../MyAssetChart';
import Grid from '@mui/material/Grid';
import './style.css';
import { color } from 'd3';

const MyAssetTotal = (props) => {
  const addComma = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const MyAssetForTotal = props.myAsset.map((asset) => {
    return asset.multi;
  });

  const [USDChartTotal, setUSDChartTotal] = useState(0);
  const [EURChartTotal, setEURChartTotal] = useState(0);
  const [GBPChartTotal, setGBPChartTotal] = useState(0);
  const [CNYChartTotal, setCNYChartTotal] = useState(0);
  const [JPYChartTotal, setJPYChartTotal] = useState(0);

  useEffect(() => {
    const ChartTotal = {
      usdchart: 0,
      eurchart: 0,
      gbpchart: 0,
      cnychart: 0,
      jpychart: 0,
    };
    if (props.myAsset.length > 0) {
      props.myAsset.forEach((bsset) => {
        if (bsset.code === 'USD') {
          ChartTotal.usdchart += bsset.quantity * bsset.price;
        }
        if (bsset.code === 'CNY') {
          ChartTotal.cnychart += bsset.quantity * bsset.price;
        }
        if (bsset.code === 'EUR') {
          ChartTotal.eurchart += bsset.quantity * bsset.price;
        }
        if (bsset.code === 'GBP') {
          ChartTotal.gbpchart += bsset.quantity * bsset.price;
        }
        if (bsset.code === 'JPY') {
          ChartTotal.jpychart += bsset.quantity * bsset.price;
        }
      });
    }

    setUSDChartTotal(ChartTotal.usdchart);
    setCNYChartTotal(ChartTotal.cnychart);
    setEURChartTotal(ChartTotal.eurchart);
    setGBPChartTotal(ChartTotal.gbpchart);
    setJPYChartTotal(ChartTotal.jpychart);
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
        if (asset.code === 'USD') {
          totalForGraph.eachUSD += +asset.multi;
        } else if (asset.code === 'EUR') {
          totalForGraph.eachEUR += +asset.multi;
        } else if (asset.code === 'GBP') {
          totalForGraph.eachGBP += +asset.multi;
        } else if (asset.code === 'CNY') {
          totalForGraph.eachCNY += +asset.multi;
        } else if (asset.code === 'JPY') {
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

  // 국가별 총 합계 새로 고침 없이 계산하기 위한 것(구매금액)
  const [nationTotal, setNationTotal] = useState(0);

  useEffect(() => {
    const total = { eachTotal: 0 };
    if (props.filteredItems.length > 0) {
      props.filteredItems.forEach((asset) => {
        if (asset.code === 'USD') {
          total.eachTotal += +asset.multi;
        } else if (asset.code === 'EUR') {
          total.eachTotal += +asset.multi;
        } else if (asset.code === 'GBP') {
          total.eachTotal += +asset.multi;
        } else if (asset.code === 'CNY') {
          total.eachTotal += +asset.multi;
        } else if (asset.code === 'JPY') {
          total.eachTotal += +asset.multi;
        }
      });
    }

    setNationTotal(total.eachTotal);
  }, [props.filteredItems]);

  // 국가별 총 합계 새로 고침 없이 계산하기 위한 것(등록 양) => 일단 보류
  const [quantityTotal, setQuantityTotal] = useState(0);

  useEffect(() => {
    const total = { eachTotal: 0 };
    if (props.filteredItems.length > 0) {
      props.filteredItems.forEach((asset) => {
        if (asset.code === 'USD') {
          total.eachTotal += +asset.quantity;
        } else if (asset.code === 'EUR') {
          total.eachTotal += +asset.quantity;
        } else if (asset.code === 'GBP') {
          total.eachTotal += +asset.quantity;
        } else if (asset.code === 'CNY') {
          total.eachTotal += +asset.quantity;
        } else if (asset.code === 'JPY') {
          total.eachTotal += +asset.quantity;
        }
      });
    }

    setQuantityTotal(total.eachTotal);
  }, [props.filteredItems]);

  // 내 자산 국가별 총 합계 새로 고침 없이 계산하기 위한 것(구매양)
  const [myUSDTotal, setMyUSDTotal] = useState(0);
  const [myEURTotal, setMyEURTotal] = useState(0);
  const [myGBPTotal, setMyGBPTotal] = useState(0);
  const [myCNYTotal, setMyCNYTotal] = useState(0);
  const [myJPYTotal, setMyJPYTotal] = useState(0);

  useEffect(() => {
    const total = {
      USDTotal: 0,
      EURTotal: 0,
      GBPTotal: 0,
      CNYTotal: 0,
      JPYTotal: 0,
    };
    if (props.myAsset.length > 0) {
      props.myAsset.forEach((asset) => {
        if (asset.code === 'USD') {
          total.USDTotal += +asset.quantity;
        } else if (asset.code === 'EUR') {
          total.EURTotal += +asset.quantity;
        } else if (asset.code === 'GBP') {
          total.GBPTotal += +asset.quantity;
        } else if (asset.code === 'CNY') {
          total.CNYTotal += +asset.quantity;
        } else if (asset.code === 'JPY') {
          total.JPYTotal += +asset.quantity;
        }
      });
    }

    setMyUSDTotal(total.USDTotal);
    setMyEURTotal(total.EURTotal);
    setMyGBPTotal(total.GBPTotal);
    setMyCNYTotal(total.CNYTotal);
    setMyJPYTotal(total.JPYTotal);
  }, [props.myAsset]);

  // 실시간 환율 새로고침 오류 해결
  const forUSD = props.live.length === 5 ? props.live[0].buyPrice : 'none';
  const forJPY = props.live.length === 5 ? props.live[1].buyPrice : 'none';
  const forEUR = props.live.length === 5 ? props.live[2].buyPrice : 'none';
  const forGBP = props.live.length === 5 ? props.live[3].buyPrice : 'none';
  const forCNY = props.live.length === 5 ? props.live[4].buyPrice : 'none';

  const liveUSD = myUSDTotal * forUSD;
  const liveJPY = myJPYTotal * forJPY;
  const liveEUR = myEURTotal * forEUR;
  const liveGBP = myGBPTotal * forGBP;
  const liveCNY = myCNYTotal * forCNY;

  const All = liveUSD + liveJPY + liveEUR + liveGBP + liveCNY;

  //가진 보유 화폐 구매 총 합계
  const Total = MyAssetForTotal.reduce((a, b) => a + b, 0);
  // 손익(실시간 환율 반영)
  const Calc = All - Total;

  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: 'center',
      }}
    >
      <Grid item xs={6}>
        <div className="title">
          <h1 className="ff-b fls fs-normal fc-dark-grey">
            '{sessionStorage.getItem('name')}'님의 보유 외화 목록
          </h1>
          <strong className="ff-b fs-title fc-dark-grey">
            자산 현황 : {addComma(Total.toString())}원
          </strong>
        </div>
        <div className="detail">
          <div className="detail-box">
            {props.filterBaseCode === 'All' && (
              <h1 className="ff-b fs-normal fc-grey">구매 금액</h1>
            )}
            {props.filterBaseCode === 'USD' && (
              <h1 className="ff-b fs-normal fc-grey">구매 금액 (USD)</h1>
            )}
            {props.filterBaseCode === 'EUR' && (
              <h1 className="ff-b fs-normal fc-grey">구매 금액 (EUR)</h1>
            )}
            {props.filterBaseCode === 'GBP' && (
              <h1 className="ff-b fs-normal fc-grey">구매 금액 (GBP)</h1>
            )}
            {props.filterBaseCode === 'CNY' && (
              <h1 className="ff-b fs-normal fc-grey">구매 금액 (CNY)</h1>
            )}
            {props.filterBaseCode === 'JPY' && (
              <h1 className="ff-b fs-normal fc-grey">구매 금액 (JPY)</h1>
            )}
            <strong className="ff-b fs-title fc-green">
              {addComma(nationTotal.toString())}원
            </strong>
          </div>
          <div className="detail-box">
            <h1 className="ff-b fs-normal fc-grey">전체 손익</h1>
            {Calc >= 0 && (
              <strong className="ff-b fs-title fc-red">
                  +{addComma(Calc.toFixed(2).toString())}
              </strong>
            )}
            {Calc < 0 && (
              <strong className="ff-b fs-title fc-purple">
                {addComma(Calc.toFixed(2).toString())}원
              </strong>
            )}
          </div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <MyAssetChart
          USDTotal={USDChartTotal}
          EURTotal={EURChartTotal}
          GBPTotal={GBPChartTotal}
          CNYTotal={CNYChartTotal}
          JPYTotal={JPYChartTotal}
          renderusd={USDTotal}
          rendereur={EURTotal}
          rendergbp={GBPTotal}
          rendercny={CNYTotal}
          renderjpy={JPYTotal}
        />
      </Grid>
    </Grid>
  );
};

export default MyAssetTotal;
