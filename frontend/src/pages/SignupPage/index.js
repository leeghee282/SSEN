import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./styles.css";

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            mb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 로고 이미지 */}
          <Link href="/">
            <Avatar
              sx={{ width: 350, height: 350 }}
              alt="Academy"
              src="/images/Ssenlogo.png"
            ></Avatar>
          </Link>
          <Grid
            container
            sx={{
              dispaly: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              component="h1"
              id="font_test"
              sx={{
                pl: 1,
                color: "rgba(0, 0, 0, 0.6)",
                height: "50px",
                fontWeight: "900",
                fontSize: "30px",
              }}
            >
              회원가입
            </Typography>
            <Typography
              component="h6"
              id="font_test"
              sx={{ pl: 1, color: "rgba(0, 0, 0, 0.6)", fontSize: "14px" }}
            >
              본인의 이름과 휴대전화번호 및 이메일을 모두 정확하게 입력해
              주세요.
            </Typography>
          </Grid>
          {/* 회원가입 form */}
          <Box component="form" noValidate sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              {/* 이메일 입력창*/}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  className="inputRounded"
                  fullWidth
                  id="name"
                  label="이름"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  sx={{ mt: 2.2 }}
                />
              </Grid>

              {/* 전화번호 */}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  className="inputRounded"
                  fullWidth
                  name="phone_number"
                  label="전화번호"
                  id="phone_number"
                />
              </Grid>
              {/* 이메일 입력 */}
              <Grid item xs={9.5}>
                <TextField
                  className="inputRounded"
                  required
                  fullWidth
                  name="email"
                  label="이메일"
                  id="email"
                />
              </Grid>
              <Grid item xs={2.5}>
                <Button
                  sx={{
                    background: "#DDF2FD",
                    height: "40px",
                    display: "flex",
                    mt: 1,
                    ml: 1,
                    width: "90px",
                    color : "black",
                    fontWeight : 700,
                    borderRadius :3
                  }}
                >
                  본인인증
                </Button>
              </Grid>
              <Box sx={{ height: 50, width: 100 }}></Box>
              {/* 아이디 입력 */}
              <Grid item xs={12}>
                <TextField
                  className="inputRounded"
                  required
                  fullWidth
                  name="user_id"
                  label="아이디"
                  id="user_id"
                />
              </Grid>
              {/* 비밀번호 입력 */}
              <Grid item xs={12}>
                <TextField
                  className="inputRounded"
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  id="password"
                  type="password"
                />
              </Grid>
              {/* 비밀번호 확인 */}
              <Grid item xs={12}>
                <TextField
                  className="inputRounded"
                  required
                  fullWidth
                  name="check_password"
                  label="비밀번호확인"
                  id="check_password"
                  type="password"
                />
              </Grid>
              {/* 닉네임 설정 */}
              <Grid sx={{ mt: 7 }} item xs={9.5}>
                <TextField
                  placeholder="사용할 닉네임을 입력해 주세요"
                  className="inputRounded"
                  required
                  fullWidth
                  name="nickname"
                  
                  id="nickname"
                />
              </Grid>
              <Grid sx={{ mt: 7 }} item xs={2}>
                <Button
                  sx={{
                    background: "#DDF2FD",
                    height: "40px",
                    display: "flex",
                    mt: 1,
                    ml: 1,
                    color : "black",
                    fontWeight : 700,
                    width: "90px",
                    borderRadius :3
                  }}
                >
                  중복확인
                </Button>
              </Grid>
            </Grid>
            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 10, mb: 2, borderRadius: "20px" }}
            >
              <Typography id="font_test" component="h6" variant="h6">
                회원가입
              </Typography>
            </Button>
            <Grid container justifyContent="flex-end">
              {/* 로그인 페이지로 연결 */}
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  id="font_test"
                  style={{ color: "#808080", textDecoration: "none" }}
                >
                  아이디가 있으신가요? 로그인하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
