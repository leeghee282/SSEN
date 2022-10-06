import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import axios from '../../api/user';
import { baseURL } from '../../api';
import { Email } from '@mui/icons-material';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const initialValues = { userId: '', password: ' ' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [changeState, setChangeState] = useState(false);
  const { setAccessToken } = useContext(UserContext);

  //유효성 검사

  const validate = () => {
    const errors = {};
    if (!formValues.userId) {
      errors.password = '로그인 정보를 확인하세요.';
    }
    if (!formValues.password) {
      errors.password = '비밀번호를 입력해주세요.';
    }

    setFormErrors(errors);
    if (!(errors.userId + errors.password)) {
      return true;
    }
    return false;
  };

  //로그인 함수
  const handleLogin = async (userId, password) => {
    const body = {
      userId: userId,
      password: password,
    };
    try {
      const response = await axios.post(baseURL + '/api/v1/user/login', body);
      const resPassword = response.data.password;
      const resAccessToken = response.data.accessToken;
      const resEmail = response.data.email;
      const resName = response.data.name;
      const resNickname = response.data.nickname;
      const resPhone = response.data.phone;
      const resUid = response.data.uid;
      const resUserId = response.data.userId;

      sessionStorage.setItem('password', resPassword);
      sessionStorage.setItem('accessToken', resAccessToken);
      sessionStorage.setItem('email', resEmail);
      sessionStorage.setItem('name', resName);
      sessionStorage.setItem('nickname', resNickname);
      sessionStorage.setItem('phone', resPhone);
      sessionStorage.setItem('uid', resUid);
      sessionStorage.setItem('userId', resUserId);

      if (response.status === 200) {
        navigate('/');
      } else {
        return;
      }
    } catch (e) {
      setFormErrors({ ...formErrors, password: '로그인 정보를 확인하세요.' });
    }
  };

  //제출 함수
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      handleLogin(formValues.userId, formValues.password);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/images/LogoChart2.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Link href="/">
              <Avatar
                sx={{
                  width: 300,
                  height: 200,
                  m: 1,
                  bgcolor: 'white',
                  cursor: 'pointer',
                }}
                src="/images/SsenLogo_last.png"
              >
                <LockOutlinedIcon />
              </Avatar>
            </Link>
            <Typography component="h1" variant="h5"></Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="userId"
                label="아이디"
                name="userId"
                autoFocus
                InputProps={{
                  style: { fontFamily: 'Pretendard Variable' },
                }}
              />

              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography id="font_test" color="red">
                {formErrors.password}
              </Typography>

              <Button
                onClick={handleSubmit}
                id="font_test"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography
                    sx={{ pl: 1, fontSize: '14px' }}
                    style={{ color: '#808080', fontFamily: 'MICEGothic Bold' }}
                  >
                    계정이 없으신가요?&nbsp;
                    <Link
                      href="/signup"
                      variant="body2"
                      style={{
                        color: 'rgb(21 120 219)',
                        fontFamily: 'MICEGothic Bold',
                        textDecoration: 'none',
                      }}
                    >
                      {'회원가입'}
                    </Link>
                    하기
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
