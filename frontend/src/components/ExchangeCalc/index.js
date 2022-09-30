import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Grid } from "@mui/material";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrencyCode,
  getDate,
  getExchangeRate,
  getBanksInfo,
} from "../../_actions/exchange_action";

function ExchangeCalc() {
  const dispatch = useDispatch();

  const currencyCode = useSelector(
    (state) => state.exchangecalcReducer.currencyCode
  );
  // const exchangeDate = useSelector((state) =>
  //   moment(state.exchangecalcReducer.exchangeDate).format("YYYY-MM-DD")
  // );
  const banksInfo = useSelector((state) => state.exchangecalcReducer.banksInfo);

  const [selectDate, setSelectDate] = useState(new Date());
  const [banklist, setBanklist] = useState([]);
  const [bankInfo, setBankInfo] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [exchangePrice, setExchangePrice] = useState(0);

  const [fromCurrencyName, setFromCurrencyName] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrencyName, setToCurrencyName] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  useEffect(() => {
    onSetBankinfos();
  }, []);

  useEffect(() => {
    onSetExchangeRate(selectDate, codeValue);
  }, [codeValue]);

  const onSetBankinfos = async () => {
    let body = {
      code: currencyCode,
    };
    await dispatch(getBanksInfo(body)).then((response) => {
      response.payload.map((bank) => {
        var addBankinfo = {
          value: bank.bank,
          label: bank.bank,
        };
        return setBanklist((prevList) => [...prevList, addBankinfo]);
      });
    });
  };

  const onSelectBankHandler = (selectedOption) => {
    const bankinfo = banksInfo.filter(
      (info) => info.bank === selectedOption.value
    );
    setBankInfo({
      bank: bankinfo[0].bank,
      commission: bankinfo[0].commission,
      basicRate: bankinfo[0].basicRate,
    });
  };

  const currencylist = [
    { value: "USD", label: "USD/KRW" },
    { value: "EUR", label: "EUR/KRW" },
    { value: "GBP", label: "GBP/KRW" },
    { value: "JPY", label: "JPY/KRW" },
    { value: "CNY", label: "CNY/KRW" },
  ];

  const onSelectCurrencyHandler = (selectedOption) => {
    setCodeValue(selectedOption.value);
    setFromCurrencyName(selectedOption.label.substr(0, 3));
    setToCurrencyName(selectedOption.label.substr(-3));
  };

  const onSetExchangeRate = (date, code) => {
    let body = {
      date: moment(date).format("YYYY-MM-DD"),
      code: code,
    };
    dispatch(getExchangeRate(body)).then((response) => {
      console.log(response.payload);
      setExchangePrice(response.payload.closePrice);
    });
  };

  const onExchangeCalculation = (event) => {
    setFromCurrency(event.currentTarget.value);
    setToCurrency(event.currentTarget.value * exchangePrice);
  };

  const onChangeCalculation = () => {
    const temp = fromCurrencyName;
    setFromCurrencyName(toCurrencyName);
    setToCurrencyName(temp);

    setExchangePrice((1 / exchangePrice).toFixed(5));
    console.log(exchangePrice);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencyCodeHandler = (code) => {
    dispatch(getCurrencyCode(code)).then((reponse) => {
      console.log(reponse.payload);
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={selectDate}
            onChange={(date) => setSelectDate(date)}
          />
        </Grid>
        <Grid item xs={6}>
          <Select options={banklist} onChange={onSelectBankHandler} />
        </Grid>

        <p>은행: {`${bankInfo.bank}`}</p>
        <p>수수료: {`${bankInfo.commission}`}</p>
        <p>기본 우대율: {`${bankInfo.basicRate}`}</p>

        <Select options={currencylist} onChange={onSelectCurrencyHandler} />

        <label>{`${fromCurrencyName}`}</label>
        <input onChange={onExchangeCalculation} value={fromCurrency} />
        <p>{`${toCurrencyName} : ${toCurrency}`}</p>
        <button onClick={onChangeCalculation}>change</button>
      </Grid>

      {/* <div>
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
        
        <p>currency: {`${currencyCode}`}</p>
      </div>
      <div>
        <p>exchangeRate: {`${exchangeRate}`}</p>
        <label>{`${fromCurrencyName}`}</label>
        <input onChange={onExchangeCalculation} value={fromCurrency} />
        <p>{`${toCurrencyName} : ${toCurrency}`}</p>
        <button onClick={onChangeCalculation}>change</button>
      </div>
      <button onClick={onExchangeRateHandler}>테스트</button> */}
    </div>
  );
}

export default ExchangeCalc;
