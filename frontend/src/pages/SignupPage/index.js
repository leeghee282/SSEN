import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./styles.css"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
          <Avatar
            sx={{ width: 250, height: 250 }}
            alt="Academy"
            src="/images/Ssenlogo.png"
          ></Avatar>
          <Grid container sx={{dispaly:"flex", flexDirection: "column", justifyContent:"flex-start"}}>
          <Typography 
            component="h1"
            
            id="font_test"
            sx={{ pl:1,color: "rgba(0, 0, 0, 0.6)" ,height:"50px",fontWeight:"900",fontSize:"30px"}}
          >
            회원가입
            
          </Typography>
          <Typography
            component="h6"
            
            id="font_test"
            sx={{ pl:1,color: "rgba(0, 0, 0, 0.6)", fontSize:"14px" }}
          >
            본인의 이름과 휴대전화번호 및 이메일을 모두 정확하게 입력해 주세요.
            
          </Typography>
          </Grid>
          {/* 회원가입 form */}
          <Box
            component="form"
            noValidate
            
            sx={{ mt: 5 }}
          >
            <Grid container spacing={2}>
              {/* 이미지 업로드 */}
              
              {/* 이메일 입력창*/}
              <Grid item xs={12} sm={12}>
                
                <TextField
                  className="inputRounded"
                  fullWidth
                  id="email"
                  label="이름"
                  name="name"
                  autoComplete="name"
                  autoFocus
                
                  sx={{ background: "white", mt: 2.2  }}
                />
                
              </Grid>
              
              {/* 비밀번호 입력창*/}
              <Grid item xs={12} sm={12}>

                <TextField
                  className="inputRounded"
                  required
                  fullWidth
                  name="password"
                  label="전화번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  
            
                  sx={{ background: "white" }}
                />
                
              </Grid>
              <Box sx={{ height:50,width:100}}></Box>
              {/* 비밀번호 재입력창 */}
              <Grid item xs={12}>
                
                <TextField
                  className="inputRounded"
                  required
                  fullWidth
                  name="check_password"
                  label="이메일"
                  id="check_password"
                  type="password"
                  autoComplete="check_password"
                  
                
                  sx={{ background: "white" }}
                />
                
              </Grid>
              {/* 이름 입력창 */}
              <Grid item xs={12}>
              
                <TextField
                  className="inputRounded"
                  required
                  fullWidth
                  name="username"
                  label="비밀번호"
                  id="username"
                  autoComplete="username"
                
                
                  sx={{ background: "white" }}
                />
                
              </Grid>
              {/* 전화번호 입력창 */}
              <Grid item xs={12}>
              
                <TextField
                  className="inputRounded"
                  required
                  fullWidth
                  name="phone_number"
                  label="비밀번호확인"
                  id="phone_number"
                  autoComplete="phone_number"
                  
                
                  sx={{ background: "white" }}
                />
              
              </Grid>
            </Grid>
            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 10, mb: 2 ,borderRadius:"20px"}}
            
            >
              <Typography id="font_test" component="h6" variant="h6">
                회원가입
              </Typography>
            </Button>
            <Grid container justifyContent="flex-end">
              {/* 로그인 페이지로 연결 */}
              <Grid item>
                <Link
                  href="/"
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