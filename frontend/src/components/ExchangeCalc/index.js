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

import "./style.css";

function ExchangeCalc() {
  const dispatch = useDispatch();

  const currencyCode = useSelector(
    (state) => state.exchangecalcReducer.currencyCode
  );
  // const exchangeDate = useSelector((state) =>
  //   moment(state.exchangecalcReducer.exchangeDate).format("YYYY-MM-DD")
  // );
  const banksInfo = useSelector((state) => state.exchangecalcReducer.banksInfo);

  var year = new Date().getFullYear();
  var month = new Date().getMonth();
  var day = new Date().getDate() - 1;

  var yesterday = new Date(year, month, day);

  const [selectDate, setSelectDate] = useState(yesterday);
  const [banklist, setBanklist] = useState([]);
  const [bankInfo, setBankInfo] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [exchangePrice, setExchangePrice] = useState(0);

  const [fromCurrencyName, setFromCurrencyName] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrencyName, setToCurrencyName] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [finalPrice, setFinalPrice] = useState(0);

  const [bank, setBank] = useState("");
  const [commission, setCommission] = useState("");
  const [basicRate, setBasicRate] = useState("");

  var changeStatus = 0;

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

    setBank(bankinfo[0].bank);
    setCommission(bankinfo[0].commission);
    setBasicRate(bankinfo[0].basicRate);
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

  const onSetExchangeRate = async (date, code) => {
    let body = {
      date: moment(date).format("YYYY-MM-DD"),
      code: code,
    };
    await dispatch(getExchangeRate(body)).then((response) => {
      console.log(response.payload);
      setExchangePrice(response.payload.closePrice);

      setFromCurrency(1);
      setToCurrency(response.payload.closePrice);
    });
  };

  const onExchangeCalculation = (event) => {
    setFromCurrency(event.currentTarget.value);
    setToCurrency(
      Math.round(event.currentTarget.value * exchangePrice * 100) / 100
    );
  };

  const onChangeCalculation = async () => {
    const temp = fromCurrencyName;
    setFromCurrencyName(toCurrencyName);
    setToCurrencyName(temp);

    if (changeStatus === 0) {
      setExchangePrice(Math.round((1 / exchangePrice) * 100000) / 100000);
      changeStatus += 1;
    } else if (changeStatus === 1) {
      await onSetChangeExchangeRate();
      changeStatus -= 1;
    }

    console.log(exchangePrice);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const onSetChangeExchangeRate = async (date, code) => {
    let body = {
      date: moment(date).format("YYYY-MM-DD"),
      code: code,
    };
    await dispatch(getExchangeRate(body)).then((response) => {
      console.log(response.payload);
      setExchangePrice(response.payload.closePrice);
    });
  };

  const getCurrencyCodeHandler = (code) => {
    dispatch(getCurrencyCode(code)).then((reponse) => {
      console.log(reponse.payload);
    });
  };

  return (
    <div id="calcboard">
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={selectDate}
            onChange={(date) => setSelectDate(date)}
          />
        </Grid>
        <Grid item xs={7}>
          <Select options={banklist} onChange={onSelectBankHandler} />
        </Grid>
        <Grid item xs={12}>
          <p>{`${bank}, 수수료 ${commission}, 기본 우대율 ${basicRate}`}</p>
        </Grid>
        <Grid item xs={12}>
          <Select options={currencylist} onChange={onSelectCurrencyHandler} />
        </Grid>
        <Grid item xs={12}>
          <label>{`${fromCurrencyName}`}</label>
          <input onChange={onExchangeCalculation} value={fromCurrency} />
          <p>{`${toCurrencyName} : ${toCurrency}`}</p>
        </Grid>
        <button onClick={onChangeCalculation}>change</button>
      </Grid>
    </div>
  );
}

export default ExchangeCalc;
