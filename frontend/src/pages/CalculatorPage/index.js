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
        <button onClick={addCalc} className="calbutton">
          비교하기
        </button>
      </div>
    </div>
  );
}

export default Calculator;
