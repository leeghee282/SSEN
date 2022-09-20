import React, { useState } from "react";
import ExchangeCalc from "../../components/ExchangeCalc";

function Calculator() {
  const [calc, setCalc] = useState([<ExchangeCalc />]);

  const addCalc = () => {
    setCalc(calc.concat(<ExchangeCalc />));
  };

  return (
    <div>
      <h1>환율계산기</h1>
      <div>{calc}</div>
      <button onClick={addCalc}>추가</button>
    </div>
  );
}

export default Calculator;
