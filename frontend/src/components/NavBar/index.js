import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseNewsURL } from '../../api';

//mui
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import './style.css';

//유정추가
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
// import '../../../node_modules/react-notifications/lib/notifications.css';

// 회원정보 popover
const BasicPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        size="small"
        id="font_test"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        회원정보
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Button sx={{ p: 2 }} href="/profile" id="font_test">
          프로필 보기
        </Button>
        <Divider />
        <Button sx={{ p: 2 }} href="/profileupdate" id="font_test">
          회원정보 수정
        </Button>
      </Popover>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  // 키워드 저장
  const [word, setWord] = useState('');

  // 기본 날짜주기(일주일)
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const dayOfToday = today.getDate();
  const lastWeek = today.getDate() - 6;
  const endDate = year + '-' + month + '-' + '01';
  const startDate =
    year + '-' + month + '-' + (lastWeek - dayOfToday <= 0 ? '25' : lastWeek);

  // 유정 추가
  // 웹소켓 연결
  const webSocket = new WebSocket('wss://j7e204.p.ssafy.io:8080/ssen');
  // const webSocket = new WebSocket("wss://loclhost:8080/ssen");

  useEffect(() => {
    webSocket.onopen = function () {};
  }, []);

  webSocket.onmessage = function (message) {
    // console.log(JSON.parse(message.data),123123)
    //======push알림용 시작==============
    if (message.data.includes('targetPrice')) {
      //console.log(JSON.parse(message.data));
      // 목표환율 설정한 유저와 목표 환율 유저가 같으면
      if (loginFlag === JSON.parse(message.data).userId) {
        const currencyCode = JSON.parse(message.data).currencyCode;
        if (currencyCode === 'USD') {
          NotificationManager.error(
            // 볼드 처리 안된 부분에 쓸 내용
            JSON.parse(message.data).name +
              '님의 목표 환율 ' +
              JSON.parse(message.data).targetPrice +
              '에 도달했습니다.' +
              +JSON.parse(message.data).regdate.time.hour +
              ':' +
              JSON.parse(message.data).regdate.time.minute +
              ':' +
              JSON.parse(message.data).regdate.time.second,

            // 볼드 처리 된 부분에 쓸 내용
            JSON.parse(message.data).currencyCode +
              ' 현재 환율 : ' +
              JSON.parse(message.data).buyPrice,

            // 자동으로 사라지기까지 걸리는 시간 (단위는 ms인거같음)
            5000,
          );
        } else if (currencyCode === 'EUR') {
          NotificationManager.success(
            // 볼드 처리 안된 부분에 쓸 내용
            JSON.parse(message.data).name +
              '님의 목표 환율 ' +
              JSON.parse(message.data).targetPrice +
              '에 도달했습니다.' +
              +JSON.parse(message.data).regdate.time.hour +
              ':' +
              JSON.parse(message.data).regdate.time.minute +
              ':' +
              JSON.parse(message.data).regdate.time.second,

            // 볼드 처리 된 부분에 쓸 내용
            JSON.parse(message.data).currencyCode +
              ' 현재 환율 : ' +
              JSON.parse(message.data).buyPrice,

            // 자동으로 사라지기까지 걸리는 시간 (단위는 ms인거같음)
            5000,
          );
        } else if (currencyCode === 'GBP') {
          NotificationManager.info(
            // 볼드 처리 안된 부분에 쓸 내용
            JSON.parse(message.data).name +
              '님의 목표 환율 ' +
              JSON.parse(message.data).targetPrice +
              '에 도달했습니다.\n' +
              +JSON.parse(message.data).regdate.time.hour +
              ':' +
              JSON.parse(message.data).regdate.time.minute +
              ':' +
              JSON.parse(message.data).regdate.time.second,
            // 볼드 처리 된 부분에 쓸 내용
            JSON.parse(message.data).currencyCode +
              ' 현재 환율 : ' +
              JSON.parse(message.data).buyPrice,

            // 자동으로 사라지기까지 걸리는 시간 (단위는 ms인거같음)
            5000,
          );
        } else if (currencyCode === 'JPY') {
          NotificationManager.warning(
            // 볼드 처리 안된 부분에 쓸 내용
            JSON.parse(message.data).name +
              '님의 목표 환율 ' +
              JSON.parse(message.data).targetPrice +
              '에 도달했습니다.' +
              +JSON.parse(message.data).regdate.time.hour +
              ':' +
              JSON.parse(message.data).regdate.time.minute +
              ':' +
              JSON.parse(message.data).regdate.time.second,

            // 볼드 처리 된 부분에 쓸 내용
            JSON.parse(message.data).currencyCode +
              ' 현재 환율 : ' +
              JSON.parse(message.data).buyPrice,

            // 자동으로 사라지기까지 걸리는 시간 (단위는 ms인거같음)
            5000,
          );
        }
      }
    } //=======push알림 끝============
    //========실시간 환율 시작
    else {
      //json형식으로 변환
      //아래처럼 쓰면 해당 데이터만 잘 나오는데 변수에 저장해서 쓰는건 몰겟음ㅇㅂㅇ....ㅠ
      // console.log(JSON.parse(message.data).regdate);
    }
  };

  //유정 추가 끝

  const onSubmit = async (e) => {
    webSocket.close();
    e.preventDefault();
    navigate('/search', {
      state: {
        startDate: startDate,
        endDate: endDate,
        search: word,
      },
    });
    setWord(''); //submit 후 창 비우기
    // try {
    //   await axios
    //     .get(baseNewsURL + `/news/search/${word}/${startDate}/${endDate}`)
    //     .then((response) => console.log(response, 123));
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const onLinkSubmit = async (e) => {
    webSocket.close();
    e.preventDefault();
    navigate('/search', {
      state: {
        startDate: startDate,
        endDate: endDate,
        search: '한국',
      },
    });
  };

  const onChange = (e) => {
    setWord(e.target.value);
    webSocket.close();
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      setWord(word);
      onSubmit(e);
    }
  };

  // const onSubmit = () => {
  //   navigate(`/search`);
  //   setWord("");
  // };

  const logoClickHandler = () => {
    webSocket.close();

    navigate('/');
  };

  const [logoutCount, setLogoutCount] = useState(0);
  const [loginFlag, setLoginFlag] = useState(() =>
    sessionStorage.getItem('userId'),
  );

  //로그아웃 버튼 함수
  const handleLogout = () => {
    sessionStorage.clear();
    setLogoutCount(logoutCount + 1);
    navigate('/');
  };

  //환율계산기
  const newExchangeCalc = () => {
    window.open('/exchangecalc', '_blank', 'height=700, width= 600');
  };

  return (
    <Box
      style={{
        background: '#F5F5F5',
        height: 'fit-content',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          overflowX: 'auto',
          background: '#ffffff',
        }}
      >
        {/* LOGO IMAGE */}
        <Box sx={{ display: 'flex' }}>
          <Avatar
            sx={{ width: 100, height: 100, cursor: 'pointer' }}
            alt="Academy"
            src="/images/SsenLogo_last.png"
            onClick={logoClickHandler}
            style={{ alignItems: 'center' }}
          />
          <Button
            href="/"
            id="font_test"
            sx={{ fontSize: '12px', fontWeight: '700', color: 'black', ml: 2 }}
          >
            Home
          </Button>
          <Button
            href="/exchangecalc"
            id="font_test"
            sx={{ fontSize: '12px', fontWeight: '700', color: 'black' }}
          >
            계산기
          </Button>
          <Button
            onClick={onLinkSubmit}
            id="font_test"
            sx={{ fontSize: '12px', fontWeight: '700', color: 'black' }}
          >
            뉴스검색
          </Button>
          <Button
            href="/profile"
            id="font_test"
            sx={{
              fontSize: '12px',
              fontWeight: '700',
              color: 'black',
              width: '110px',
            }}
          >
            보유 및 관심화폐
          </Button>
          <Button
            href="/profileupdate"
            id="font_test"
            sx={{ fontSize: '12px', fontWeight: '700', color: 'black' }}
          >
            Settings
          </Button>
        </Box>
        <Box sx={{ width: 400 }}></Box>
        <Box sx={{ width: 150 }}></Box>
        <Box></Box>
        <Box></Box>

        <Stack spacing={1} direction="row" sx={{ width: '250px' }}>
          <TextField
            id="font_Sans"
            fullWidth
            type="search"
            variant="standard"
            placeholder="검색어를 입력해주세요"
            onChange={onChange}
            onKeyDown={keyDownHandler}
            value={word}
          />
          <Avatar
            type="submit"
            sx={{
              p: '10px',
              height: '15px',
              width: '15px',
              cursor: 'pointer',
              mr: '100px',
            }}
            aria-label="search"
            onClick={onSubmit}
            src="/images/search.png"
          ></Avatar>
        </Stack>
        {/* 로그인을 안했을 경우 */}

        {loginFlag === null && (
          <Stack spacing={1} direction="row">
            <Box>
              <Button
                sx={{ ml: 1, fontSize: '12px' }}
                id="font_test"
                variant="contained"
                size="small"
                href="/login"
              >
                로그인
              </Button>
              <Button
                sx={{ ml: 1, fontSize: '12px' }}
                id="font_test"
                variant="contained"
                size="small"
                href="/signup"
              >
                회원가입
              </Button>
            </Box>
          </Stack>
        )}
        {/* 로그인한 경우 */}
        {loginFlag !== null && (
          <Stack spacing={1} direction="row">
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography id="font_test" sx={{ mr: 2 }}>
                '{sessionStorage.getItem('name')}' 님
              </Typography>

              <BasicPopover />
              {/* <Button
                sx={{ ml: 1, background: "red" }}
                id="font_test"
                variant="contained"
                size="small"
                href="/profileupdate"
              >
                프로필 수정
              </Button> */}
              <Button
                sx={{ ml: 1 }}
                id="font_test"
                variant="outlined"
                size="small"
                href="/"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </Box>
          </Stack>
        )}
      </Toolbar>

      <NotificationContainer sx={{ background: 'red' }} />
      {/* 각 페이지 별로 받아오는 container */}
      <Container maxwidth="fluid" style={{ marginTop: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box style={{ width: '100%' }}>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
