import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getExchangeRate, getBanksInfo } from "../../_actions/exchange_action";

function ExchangeCalc() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("실행");
    onSetBanklist();
  }, []);

  const [banksInfo, setBanksInfo] = useState([]);
  //   const bankInfos = [
  //     { bank: "신한", commission: 0.05, basic_rate: 0.1 },
  //     { bank: "국민", commission: 0.05, basic_rate: 0.2 },
  //     { bank: "농협", commission: 0.1, basic_rate: 0.25 },
  //   ];

  const [banklist, setBanklist] = useState([]);
  const [selectBank, setSelectBank] = useState("");
  const [bankInfo, setBankInfo] = useState({
    bank: "",
    commission: "",
    basic_rate: "",
  });

  const [selectDate, setSelectDate] = useState(new Date());

  const onSelectDateHandler = (date) => {
    const renewDate = moment(date).format("YYYY-MM-DD");
    return renewDate;
  };

  const currencylist = [
    { value: "USD", label: "USD/KRW" },
    { value: "EUR", label: "EUR/KRW" },
    { value: "GBP", label: "GBP/KRW" },
    { value: "JPY", label: "JPY/KRW" },
    { value: "CNY", label: "CNY/KRW" },
  ];
  const [currencyCode, setCurrencyCode] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [fromCurrencyName, setFromCurrencyName] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [toCurrencyName, setToCurrencyName] = useState("");

  const onSetBanklist = () => {
    banksInfo.map((info) => {
      var addBanklist = {
        value: info.bank,
        label: info.bank,
      };
      return setBanklist((prevList) => [...prevList, addBanklist]);
    });
  };

  const onSelectBankHandler = (selectedOption) => {
    setExchangeRate(1400);

    setSelectBank(selectedOption.value);
    const bankinfo = banksInfo.filter(
      (info) => info.bank === selectedOption.value
    );
    setBankInfo({
      bank: bankinfo[0].bank,
      commission: bankinfo[0].commission,
      basic_rate: bankinfo[0].basic_rate,
    });
  };

  const onSelectCurrencyHandler = (selectedOption) => {
    setCurrencyCode(selectedOption.value);
    setFromCurrencyName(selectedOption.value.substr(0, 3));
    setToCurrencyName(selectedOption.value.substr(-3));
    onGetBankInfosHandler();
  };

  const onExchangeRateHandler = (event) => {
    event.preventDefault();

    const body = {
      date: onSelectDateHandler(selectDate),
      code: currencyCode,
    };

    dispatch(getExchangeRate(body)).then((response) => {
      console.log(response.payload);
      //   setExchangeRate(response.payload.exchangeRate.closePrice);
    });
  };

  const onGetBankInfosHandler = () => {
    let body = {
      code: currencyCode,
    };

    dispatch(getBanksInfo(body)).then((response) => {
      setBanksInfo(response.body);
    });
  };

  const onExchangeCalculation = (event) => {
    setFromCurrency(event.currentTarget.value);
    setToCurrency(event.currentTarget.value * exchangeRate);
  };

  const onChangeCalculation = () => {
    const temp = fromCurrencyName;
    setFromCurrencyName(toCurrencyName);
    setToCurrencyName(temp);

    setExchangeRate((1 / exchangeRate).toFixed(5));
    console.log(exchangeRate);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div>
      <div>
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={selectDate}
          onChange={(date) => setSelectDate(date)}
        />
        <Select options={banklist} onChange={onSelectBankHandler} />
        <p>date: {`${selectDate}`}</p>
        <p>은행: {`${bankInfo.bank}`}</p>
        <p>수수료: {`${bankInfo.commission}`}</p>
        <p>기본 우대율: {`${bankInfo.basic_rate}`}</p>
      </div>
      <div>
        <Select options={currencylist} onChange={onSelectCurrencyHandler} />
        <p>currency: {`${currencyCode}`}</p>
      </div>
      <div>
        <p>exchangeRate: {`${exchangeRate}`}</p>
        <label>{`${fromCurrencyName}`}</label>
        <input onChange={onExchangeCalculation} value={fromCurrency} />
        <p>{`${toCurrencyName} : ${toCurrency}`}</p>
        <button onClick={onChangeCalculation}>change</button>
      </div>
      <button onClick={onExchangeRateHandler}>테스트</button>
    </div>
  );
}

export default ExchangeCalc;
