import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Grid } from '@mui/material';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrencyCode,
  getDate,
  getExchangeRate,
  getBanksInfo,
} from '../../_actions/exchange_action';

import './style.css';

function ExchangeCalc() {
  const dispatch = useDispatch();

  const currencyCode = useSelector(
    (state) => state.exchangecalcReducer.currencyCode,
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
  const [bankInfo, setBankInfo] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [exchangePrice, setExchangePrice] = useState(0);

  const [fromCurrencyName, setFromCurrencyName] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrencyName, setToCurrencyName] = useState('');
  const [toCurrency, setToCurrency] = useState('');

  const [finalPrice, setFinalPrice] = useState(0);

  const [bank, setBank] = useState('');
  const [commission, setCommission] = useState('');
  const [basicRate, setBasicRate] = useState('');

  const [selectStatus, setSelectStatus] = useState(true);
  const [selectCurrStatus, setSelectCurrStatus] = useState(true);

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
      (info) => info.bank === selectedOption.value,
    );
    setBankInfo({
      bank: bankinfo[0].bank,
      commission: bankinfo[0].commission,
      basicRate: bankinfo[0].basicRate,
    });

    setBank(bankinfo[0].bank);
    setCommission(bankinfo[0].commission);
    setBasicRate(bankinfo[0].basicRate);

    setSelectStatus(false);
  };

  const currencylist = [
    { value: 'USD', label: 'USD/KRW' },
    { value: 'EUR', label: 'EUR/KRW' },
    { value: 'GBP', label: 'GBP/KRW' },
    { value: 'JPY', label: 'JPY/KRW' },
    { value: 'CNY', label: 'CNY/KRW' },
  ];

  const onSelectCurrencyHandler = (selectedOption) => {
    setSelectCurrStatus(true);
    setCodeValue(selectedOption.value);
    setFromCurrencyName(selectedOption.label.substr(0, 3));
    setToCurrencyName(selectedOption.label.substr(-3));
    setSelectCurrStatus(false);
  };

  const onSetExchangeRate = async (date, code) => {
    let body = {
      date: moment(date).format('YYYY-MM-DD'),
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
    setToCurrency((event.currentTarget.value * exchangePrice).toFixed(2));
  };

  const onChangeCalculation = async () => {
    const temp = fromCurrencyName;
    setFromCurrencyName(toCurrencyName);
    setToCurrencyName(temp);

    if (changeStatus === 0) {
      setExchangePrice((1 / exchangePrice).toFixed(5));
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
      date: moment(date).format('YYYY-MM-DD'),
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
        <Grid item xs={4}>
          <span id="calclabel">날짜 선택</span>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={selectDate}
            onChange={(date) => setSelectDate(date)}
            id="datepick"
          />
        </Grid>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={5}>
          <span>은행 선택</span>
          <Select options={banklist} onChange={onSelectBankHandler} />
        </Grid>
        <Grid item xs={12}>
          {selectStatus ? (
            <p>은행을 선택해주세요.</p>
          ) : (
            <p>{`${bank}, 수수료 ${commission}%, 기본 우대율 ${basicRate}%`}</p>
          )}
        </Grid>
        <Grid item xs={5}>
          <label>화폐 선택</label>
          <Select options={currencylist} onChange={onSelectCurrencyHandler} />
        </Grid>
        <Grid item xs={4}>
          <button onClick={onChangeCalculation} className="calbutton">
            순서바꾸기
          </button>
        </Grid>
        <Grid item xs={12}>
          {selectCurrStatus ? (
            <p>화폐를 선택해주세요.</p>
          ) : (
            <p>
              <span className="calcurr1">
                <label>{`${fromCurrencyName} : `}</label>
                <input
                  className="calbox"
                  onChange={onExchangeCalculation}
                  value={fromCurrency}
                />
              </span>
              <span>{' = '}</span>
              {/* <p>
                <button onClick={onChangeCalculation}>change</button>
              </p> */}
              <span className="calcurr2">
                <label>{`${toCurrencyName} : `}</label>
                <input className="calbox" value={toCurrency} />
              </span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ExchangeCalc;
