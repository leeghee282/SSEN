// 보유화폐 총액 보여주는 컴포넌트
import React, { useEffect, useState } from "react";
import axios from "../../../api/user";

const MyAssetTotal = (props) => {
  // response.data의 Value값에 접근하는 방법
  // console.log(props);
  const { myAsset } = props;
  const { live } = props;
  console.log(live);

  const MyAssetForTotal = myAsset.map((asset) => {
    return asset.multi;
  });

  // const MyAssetCode = myAsset.map((asset) => {
  //   return asset.code;
  // });

  const Total = MyAssetForTotal.reduce((a, b) => a + b, 0);
  const Calc = Total - 2000; //실시간 환율 받아서 계산 할 수 있게 해야함

  return (
    <div>
      <h1>자산 현황</h1>
      <h2>구매 총 합계 : {Total}원</h2>
      <h2>현재 총 합계 : 2000원</h2>
      <h2>손익 : {Calc}원</h2>
    </div>
  );
};

export default MyAssetTotal;
