import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
//mui
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();

  const logoClickHandler = () => {
    navigate("/");
  };
  const [logoutCount, setLogoutCount] = useState(0);
  const [loginFlag, setLoginFlag] = useState(() =>
    sessionStorage.getItem("userId")
  );

  console.log(loginFlag);

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
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Stack>
        <Stack spacing={1} direction="row">
          <Button
            id="font_test"
            variant="outlined"
            size="small"
            href="/exchangecalc"
          >
            환율계산기
          </Button>
          {loginFlag === null && (
            <Box>
              <Button
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
          {loginFlag !== null && (
            <Box sx={{display:"flex",flexDirection:"row"}}>
              <Box>
                <Typography id="font_test"sx={{pl:2,mr:3}}>{sessionStorage.getItem("name")}님</Typography>
              </Box>
              <Button
                id="font_test"
                variant="contained"
                size="small"
                href="/profile"
              >
                프로필보기
              </Button>
              <Button
                sx={{ ml: 1, background: "red" }}
                id="font_test"
                variant="contained"
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
