import React, { useState } from 'react';
import ExchangeCalc from '../../components/ExchangeCalc';

import './style.css';

function Calculator() {
  const [calc, setCalc] = useState([<ExchangeCalc />]);

  const addCalc = () => {
    setCalc(calc.concat(<ExchangeCalc />));
  };

  return (
    <div id="calc">
      <h1>환율계산기</h1>
      <div>
        <div className="calcdetail">{calc}</div>
        <button onClick={addCalc} id="font_test" className="custom-btn btn-3">
          <span>추가 환율 계산하기</span>
        </button>
      </div>
    </div>
  );
}

export default Calculator;
