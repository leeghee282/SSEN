// 보유화폐 총액 보여주는 컴포넌트
import React, {useEffect, useState} from "react";
import "./style.css"

const MyAssetTotal = (props) => {
  const addComma = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  const MyAssetForTotal = props.myAsset.map((asset) => {
    return asset.multi;
  });

  const NameNation = props.filteredItems.map((name) => {
    return name.code
  })
  
  // const LiveForTotal = live.map((lv) => {
  //   return lv.buyPrice;
  // });
  
  const[nationTotal, setNationTotal] = useState(0)

  useEffect(() => {
    const total = {eachTotal : 0}
    if (props.filteredItems.length > 0) {
      props.filteredItems.forEach(asset => {
        if (asset.code === 'USD') {
          total.eachTotal += +asset.multi
        }
        else if (asset.code === 'EUR'){
          total.eachTotal += +asset.multi
        }
        else if (asset.code === 'GBP'){
          total.eachTotal += +asset.multi
        }
        else if (asset.code === 'CNY'){
          total.eachTotal += +asset.multi
        }
        else if (asset.code === 'JPY'){
          total.eachTotal += +asset.multi
        }
      })
    }
    setNationTotal(total.eachTotal);
  }, [props.filteredItems])

  //가진 보유 화폐 구매 총 합계
  const Total = MyAssetForTotal.reduce((a, b) => a + b, 0);
  const Calc = Total-2000; //실시간 환율 받아서 계산 할 수 있게 해야함(필수!!!!)

  return (
    <div>
      <div className="title">
        <h1 className="fs-normal fc-dark-grey">'{sessionStorage.getItem("name")}'님의 보유 외화 목록</h1>
        <strong className="fs-title fc-dark-grey">자산 현황 : {addComma(Total.toString())}원</strong>
      </div>
      {/* 국가 선택 시 이름이 같이 뜨면 좋겠어요 => 수정 필요 */}
      <div className="detail">
        <div className="detail-box">
          <h1 className="fs-normal fc-grey">국가별 합계</h1>
          <strong className="fs-title fc-green">{addComma(nationTotal.toString())}원</strong>
        </div>
        <div className="detail-box">
          <h1 className="fs-normal fc-grey">손익</h1>
          {Calc >= 0 && <strong className="fs-title fc-red">{addComma(Calc.toString())}원</strong>}
          {Calc < 0 && <strong className="fs-title fc-purple">{addComma(Calc.toString())}원</strong>}
        </div>
      </div>
    </div>
  );
};

export default MyAssetTotal;
