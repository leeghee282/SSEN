import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../../api/user';
import { baseURL } from '../../api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';

const webSocket = new WebSocket('wss://j7e204.p.ssafy.io:8080/ssen');

const LiveCurrencyTable = () => {
  //미국
  const [sellPrice1, setSellPrice1] = useState('');
  const [buyPrice1, setBuyPrice1] = useState('');
  const [highPrice1, setHighPrice1] = useState('');
  const [lowPrice1, setLowPrice1] = useState('');
  const [variance1, setVariance1] = useState('');
  const [variancePrice1, setVariancePrice1] = useState('');
  const [hour1, setHour1] = useState('');
  const [minute1, setMinute1] = useState('');
  const [second1, setSecond1] = useState('');
  const [cc1, setCc1] = useState('');
  //유로
  const [sellPrice2, setSellPrice2] = useState('');
  const [buyPrice2, setBuyPrice2] = useState('');
  const [highPrice2, setHighPrice2] = useState('');
  const [lowPrice2, setLowPrice2] = useState('');
  const [variance2, setVariance2] = useState('');
  const [variancePrice2, setVariancePrice2] = useState('');
  const [hour2, setHour2] = useState('');
  const [minute2, setMinute2] = useState('');
  const [second2, setSecond2] = useState('');
  const [cc2, setCc2] = useState('');

  //파운드
  const [sellPrice3, setSellPrice3] = useState('');
  const [buyPrice3, setBuyPrice3] = useState('');
  const [highPrice3, setHighPrice3] = useState('');
  const [lowPrice3, setLowPrice3] = useState('');
  const [variance3, setVariance3] = useState('');
  const [variancePrice3, setVariancePrice3] = useState('');
  const [hour3, setHour3] = useState('');
  const [minute3, setMinute3] = useState('');
  const [second3, setSecond3] = useState('');
  const [cc3, setCc3] = useState('');

  //엔
  const [sellPrice4, setSellPrice4] = useState('');
  const [buyPrice4, setBuyPrice4] = useState('');
  const [highPrice4, setHighPrice4] = useState('');
  const [lowPrice4, setLowPrice4] = useState('');
  const [variance4, setVariance4] = useState('');
  const [variancePrice4, setVariancePrice4] = useState('');
  const [hour4, setHour4] = useState('');
  const [minute4, setMinute4] = useState('');
  const [second4, setSecond4] = useState('');
  const [cc4, setCc4] = useState('');
  //위안
  const [sellPrice5, setSellPrice5] = useState('');
  const [buyPrice5, setBuyPrice5] = useState('');
  const [highPrice5, setHighPrice5] = useState('');
  const [lowPrice5, setLowPrice5] = useState('');
  const [variance5, setVariance5] = useState('');
  const [variancePrice5, setVariancePrice5] = useState('');
  const [hour5, setHour5] = useState('');
  const [minute5, setMinute5] = useState('');
  const [second5, setSecond5] = useState('');
  const [cc5, setCc5] = useState('');

  const getStartData = async () => {
    await axios.get(baseURL + '/api/v1/live').then((response) => {
      console.log(response.data, '초기데이터 세팅');
      const reg1 = response.data[0].regdate.substr(
        response.data[0].regdate.indexOf(' ') + 1,
        8,
      );
      const reg4 = response.data[1].regdate.substr(
        response.data[1].regdate.indexOf(' ') + 1,
        8,
      );
      const reg2 = response.data[2].regdate.substr(
        response.data[2].regdate.indexOf(' ') + 1,
        8,
      );
      const reg3 = response.data[3].regdate.substr(
        response.data[3].regdate.indexOf(' ') + 1,
        8,
      );
      const reg5 = response.data[4].regdate.substr(
        response.data[4].regdate.indexOf(' ') + 1,
        8,
      );

      setSellPrice1(response.data[0].sellPrice);
      setBuyPrice1(response.data[0].buyPrice);
      setHighPrice1(response.data[0].highPrice);
      setLowPrice1(response.data[0].lowPrice);
      setVariance1(response.data[0].variance);
      setVariancePrice1(response.data[0].variancePrice);
      setHour1(reg1.substr(0, 2));
      setMinute1(reg1.substr(3, 2));
      setSecond1(reg1.substr(6, 2));

      setSellPrice4(response.data[1].sellPrice);
      setBuyPrice4(response.data[1].buyPrice);
      setHighPrice4(response.data[1].highPrice);
      setLowPrice4(response.data[1].lowPrice);
      setVariance4(response.data[1].variance);
      setVariancePrice4(response.data[1].variancePrice);
      setHour4(reg4.substr(0, 2));
      setMinute4(reg4.substr(3, 2));
      setSecond4(reg4.substr(6, 2));

      setSellPrice2(response.data[2].sellPrice);
      setBuyPrice2(response.data[2].buyPrice);
      setHighPrice2(response.data[2].highPrice);
      setLowPrice2(response.data[2].lowPrice);
      setVariance2(response.data[2].variance);
      setVariancePrice2(response.data[2].variancePrice);
      setHour2(reg2.substr(0, 2));
      setMinute2(reg2.substr(3, 2));
      setSecond2(reg2.substr(6, 2));

      setSellPrice3(response.data[3].sellPrice);
      setBuyPrice3(response.data[3].buyPrice);
      setHighPrice3(response.data[3].highPrice);
      setLowPrice3(response.data[3].lowPrice);
      setVariance3(response.data[3].variance);
      setVariancePrice3(response.data[3].variancePrice);
      setHour3(reg3.substr(0, 2));
      setMinute3(reg3.substr(3, 2));
      setSecond3(reg3.substr(6, 2));

      setSellPrice5(response.data[4].sellPrice);
      setBuyPrice5(response.data[4].buyPrice);
      setHighPrice5(response.data[4].highPrice);
      setLowPrice5(response.data[4].lowPrice);
      setVariance5(response.data[4].variance);
      setVariancePrice5(response.data[4].variancePrice);
      setHour5(reg5.substr(0, 2));
      setMinute5(reg5.substr(3, 2));
      setSecond5(reg5.substr(6, 2));
    });
  };
  //////////웹소켓 시작

  useEffect(() => {
    webSocket.onopen = function () {};
    getStartData();

    // console.log(toChartType.toChartType,"체크필요")
  }, []);
  /////////////웹소켓 끝//////////////////

  webSocket.onmessage = function (message) {
    //======push 알림 시작==============
    // console.log(currencyCode,"현재통화")
    // console.log(message.data,12423)
    // console.log(toChartType.toChartType,"체크필요")
    if (message.data.includes('targetPrice')) {
    }
    //========실시간 환율 시작
    else {
      const hour = JSON.parse(message.data).regdate.time.hour;
      const minute = JSON.parse(message.data).regdate.time.minute;
      const second = JSON.parse(message.data).regdate.time.second;
      if (JSON.parse(message.data).cc2 === 'USD') {
        //json형식으로 변환
        //   console.log(JSON.parse(message.data));
        // console.log(toChartType,"성공")
        console.log('usd성공');
        setCc1(JSON.parse(message.data).cc2);
        setSellPrice1(JSON.parse(message.data).sellPrice);
        setBuyPrice1(JSON.parse(message.data).buyPrice);
        setHighPrice1(JSON.parse(message.data).highPrice);
        setLowPrice1(JSON.parse(message.data).lowPrice);
        setVariance1(JSON.parse(message.data).variance);
        setVariancePrice1(JSON.parse(message.data).variancePrice);
        setHour1(hour < 10 ? `0${hour}` : hour);
        setMinute1(minute < 10 ? `0${minute}` : minute);
        setSecond1(second < 10 ? `0${second}` : second);
        //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
        // console.log(JSON.parse(message.data).regdate);
      }
      if (JSON.parse(message.data).cc2 === 'EUR') {
        console.log('eur성공');
        setCc2(JSON.parse(message.data).cc2);
        setSellPrice2(JSON.parse(message.data).sellPrice);
        setBuyPrice2(JSON.parse(message.data).buyPrice);
        setHighPrice2(JSON.parse(message.data).highPrice);
        setLowPrice2(JSON.parse(message.data).lowPrice);
        setVariance2(JSON.parse(message.data).variance);
        setVariancePrice2(JSON.parse(message.data).variancePrice);
        setHour2(hour < 10 ? `0${hour}` : hour);
        setMinute2(minute < 10 ? `0${minute}` : minute);
        setSecond2(second < 10 ? `0${second}` : second);
        //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
        // console.log(JSON.parse(message.data).regdate);
      }
      if (JSON.parse(message.data).cc2 === 'GBP') {
        setCc3(JSON.parse(message.data).cc2);
        setSellPrice3(JSON.parse(message.data).sellPrice);
        setBuyPrice3(JSON.parse(message.data).buyPrice);
        setHighPrice3(JSON.parse(message.data).highPrice);
        setLowPrice3(JSON.parse(message.data).lowPrice);
        setVariance3(JSON.parse(message.data).variance);
        setVariancePrice3(JSON.parse(message.data).variancePrice);
        setHour3(hour < 10 ? `0${hour}` : hour);
        setMinute3(minute < 10 ? `0${minute}` : minute);
        setSecond3(second < 10 ? `0${second}` : second);
        //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
        // console.log(JSON.parse(message.data).regdate);
      }
      if (JSON.parse(message.data).cc2 === 'JPY') {
        setCc4(JSON.parse(message.data).cc2);
        setSellPrice4(JSON.parse(message.data).sellPrice);
        setBuyPrice4(JSON.parse(message.data).buyPrice);
        setHighPrice4(JSON.parse(message.data).highPrice);
        setLowPrice4(JSON.parse(message.data).lowPrice);
        setVariance4(JSON.parse(message.data).variance);
        setVariancePrice4(JSON.parse(message.data).variancePrice);
        setHour4(hour < 10 ? `0${hour}` : hour);
        setMinute4(minute < 10 ? `0${minute}` : minute);
        setSecond4(second < 10 ? `0${second}` : second);
        //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
        // console.log(JSON.parse(message.data).regdate);
      }
      if (JSON.parse(message.data).cc2 === 'CNY') {
        setCc5(JSON.parse(message.data).cc2);
        setSellPrice5(JSON.parse(message.data).sellPrice);
        setBuyPrice5(JSON.parse(message.data).buyPrice);
        setHighPrice5(JSON.parse(message.data).highPrice);
        setLowPrice5(JSON.parse(message.data).lowPrice);
        setVariance5(JSON.parse(message.data).variance);
        setVariancePrice5(JSON.parse(message.data).variancePrice);
        setHour5(hour < 10 ? `0${hour}` : hour);
        setMinute5(minute < 10 ? `0${minute}` : minute);
        setSecond5(second < 10 ? `0${second}` : second);
        //  console.log("==========="+JSON.parse(message.data).regdate.time.hour);
        // console.log(JSON.parse(message.data).regdate);
      }
    }
  };

  return (
    <div>
      <Grid container>
        <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={10}>
          <TableContainer component={Paper} sx={{ minWidth: 400, width: 650 }}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    국가
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    매도
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    매수
                  </TableCell>
                  {/* <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    고가
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    저가
                  </TableCell> */}
                  {/* <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    변동금액
                  </TableCell> */}
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    변동 %{' '}
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    시간
                  </TableCell>
                </TableRow>
              </TableHead>
              {/*USD*/}
              <TableBody>
                <TableRow>
                  <TableCell align="right">USD</TableCell>
                  <TableCell align="right">{sellPrice1}</TableCell>
                  <TableCell align="right">{buyPrice1}</TableCell>
                  {/* <TableCell align="right">{highPrice1}</TableCell> */}
                  {/* <TableCell align="right">{lowPrice1}</TableCell> */}
                  {/* <TableCell
                    align="right"
                    style={{ color: variancePrice1 > 0 ? 'red' : 'blue' }}
                  >
                    {variancePrice1}
                  </TableCell> */}
                  <TableCell
                    align="right"
                    style={{ color: variance1 > 0 ? 'red' : 'blue' }}
                  >
                    {variance1}
                  </TableCell>
                  <TableCell align="right">
                    {hour1}:{minute1}:{second1}
                  </TableCell>
                </TableRow>
              </TableBody>
              {/*EUR*/}
              <TableBody>
                <TableRow>
                  <TableCell align="right">EUR</TableCell>
                  <TableCell align="right">{sellPrice2}</TableCell>
                  <TableCell align="right">{buyPrice2}</TableCell>
                  {/* <TableCell align="right">{highPrice2}</TableCell> */}
                  {/* <TableCell align="right">{lowPrice2}</TableCell> */}
                  {/* <TableCell
                    align="right"
                    style={{ color: variancePrice2 > 0 ? 'red' : 'blue' }}
                  >
                    {variancePrice2}
                  </TableCell> */}
                  <TableCell
                    align="right"
                    style={{ color: variance2 > 0 ? 'red' : 'blue' }}
                  >
                    {variance2}
                  </TableCell>
                  <TableCell align="right">
                    {hour2}:{minute2}:{second2}
                  </TableCell>
                </TableRow>
              </TableBody>
              {/*GBP*/}
              <TableBody>
                <TableRow>
                  <TableCell align="right">GBP</TableCell>
                  <TableCell align="right">{sellPrice3}</TableCell>
                  <TableCell align="right">{buyPrice3}</TableCell>
                  {/* <TableCell align="right">{highPrice3}</TableCell> */}
                  {/* <TableCell align="right">{lowPrice3}</TableCell> */}
                  {/* <TableCell
                    align="right"
                    style={{ color: variancePrice3 > 0 ? 'red' : 'blue' }}
                  >
                    {variancePrice3}
                  </TableCell> */}
                  <TableCell
                    align="right"
                    style={{ color: variance3 > 0 ? 'red' : 'blue' }}
                  >
                    {variance3}
                  </TableCell>
                  <TableCell align="right">
                    {hour3}:{minute3}:{second3}
                  </TableCell>
                </TableRow>
              </TableBody>
              {/*JPY*/}
              <TableBody>
                <TableRow>
                  <TableCell align="right">JPY</TableCell>
                  <TableCell align="right">{sellPrice4}</TableCell>
                  <TableCell align="right">{buyPrice4}</TableCell>
                  {/* <TableCell align="right">{highPrice4}</TableCell> */}
                  {/* <TableCell align="right">{lowPrice4}</TableCell> */}
                  {/* <TableCell
                    align="right"
                    style={{ color: variancePrice4 > 0 ? 'red' : 'blue' }}
                  >
                    {variancePrice4}
                  </TableCell> */}
                  <TableCell
                    align="right"
                    style={{ color: variance4 > 0 ? 'red' : 'blue' }}
                  >
                    {variance4}
                  </TableCell>
                  <TableCell align="right">
                    {hour4}:{minute4}:{second4}
                  </TableCell>
                </TableRow>
              </TableBody>
              {/*CNY*/}
              <TableBody>
                <TableRow>
                  <TableCell align="right">CNY</TableCell>
                  <TableCell align="right">{sellPrice5}</TableCell>
                  <TableCell align="right">{buyPrice5}</TableCell>
                  {/* <TableCell align="right">{highPrice5}</TableCell> */}
                  {/* <TableCell align="right">{lowPrice5}</TableCell> */}
                  {/* <TableCell
                    align="right"
                    style={{ color: variancePrice5 > 0 ? 'red' : 'blue' }}
                  >
                    {variancePrice5}
                  </TableCell> */}
                  <TableCell
                    align="right"
                    style={{ color: variance5 > 0 ? 'red' : 'blue' }}
                  >
                    {variance5}
                  </TableCell>
                  <TableCell align="right">
                    {hour5}:{minute5}:{second5}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default LiveCurrencyTable;
