import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseNewsURL } from "../../api";

//mui
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";

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
  const id = open ? "simple-popover" : undefined;

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
          vertical: "bottom",
          horizontal: "center",
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
  const [word, setWord] = useState("");

  // 기본 날짜주기(일주일)
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const dayOfToday = today.getDate();
  const lastWeek = today.getDate() - 6;
  const endDate = year + "-" + month + "-" + dayOfToday;
  const startDate = year + "-" + month + "-" + lastWeek;

  const onSubmit = async (e) => {
    console.log(word, "네브바 검색창");
    e.preventDefault();
    navigate("/search", {
      state: {
        startDate: startDate,
        endDate: endDate,
        search: word,
      },
    });
    setWord(""); //submit 후 창 비우기
    // try {
    //   await axios
    //     .get(baseNewsURL + `/news/search/${word}/${startDate}/${endDate}`)
    //     .then((response) => console.log(response, 123));
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const onChange = (e) => {
    setWord(e.target.value);
    console.log(word, "네브바 검색어");
  };

  // const onSubmit = () => {
  //   navigate(`/search`);
  //   setWord("");
  // };

  const logoClickHandler = () => {
    navigate("/");
  };

  const [logoutCount, setLogoutCount] = useState(0);
  const [loginFlag, setLoginFlag] = useState(() =>
    sessionStorage.getItem("userId")
  );

  //로그아웃 버튼 함수
  const handleLogout = () => {
    sessionStorage.clear();
    setLogoutCount(logoutCount + 1);
    navigate("/");
  };

  return (
    <Box
      style={{
        background: "#F5F5F5",
        height: "fit-content",
        minHeight: "100vh",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          overflowX: "auto",
          background: "#ffffff",
        }}
      >
        {/* LOGO IMAGE */}
        <Avatar
          sx={{ width: 100, height: 100, cursor: "pointer" }}
          alt="Academy"
          src="/images/SsenLogo.png"
          onClick={logoClickHandler}
          style={{ alignItems: "center" }}
        />
        <Stack spacing={1} direction="row" sx={{ width: "500px" }}>
          <TextField
            id="font_Sans"
            fullWidth
            type="search"
            variant="standard"
            placeholder="검색어를 입력해주세요"
            onChange={onChange}
            value={word}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={onSubmit}
            // href="/search"
          >
            <SearchIcon />
          </IconButton>
        </Stack>
        {/* 로그인을 안했을 경우 */}
        <Stack spacing={1} direction="row">
          {loginFlag === null && (
            <Box>
              <Button
                id="font_test"
                variant="outlined"
                size="small"
                href="/exchangecalc"
              >
                환율계산기
              </Button>
              <Button
                sx={{ ml: 1 }}
                id="font_test"
                variant="contained"
                size="small"
                href="/login"
              >
                로그인
              </Button>
              <Button
                sx={{ ml: 1 }}
                id="font_test"
                variant="contained"
                size="small"
                href="/signup"
              >
                회원가입
              </Button>
            </Box>
          )}
          {/* 로그인한 경우 */}
          {loginFlag !== null && (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography id="font_test" sx={{ pl: 2, mr: 3 }}>
                '{sessionStorage.getItem("name")}' 님
              </Typography>
              <Button
                sx={{ mr: 1 }}
                id="font_test"
                variant="outlined"
                size="small"
                href="/exchangecalc"
              >
                환율계산기
              </Button>
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
          )}
        </Stack>
      </Toolbar>
      {/* 각 페이지 별로 받아오는 container */}
      <Container maxwidth="fluid" style={{ marginTop: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box style={{ width: "100%" }}>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
