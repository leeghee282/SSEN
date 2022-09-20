import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

const theme = createTheme();

const ProfileUpdate = () => {
  const user_id = "potr12";
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm"></Container>
      <CssBaseline />
      <Box
        id="font_test"
        sx={{
          mb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: 15, width: 1000, height: 1200, background: "white" }}>
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
                background: "#E7E9ED",
                pl: 3,
                color: "rgba(0, 0, 0, 0.6)",
                height: "50px",
                fontWeight: "900",
                fontSize: "30px",
              }}
            >
              내 정보 설정
            </Typography>
          </Grid>
          {/*아이디*/}
          <Grid
            container
            sx={{
              borderStyle: "none none dashed",
              borderColor: "#BFC1C4",
              height: 100,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <Box sx={{ pl: 2 }}>아이디</Box>
            </Grid>
            <Grid item xs={4}>
              <Box>{user_id}</Box>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          {/*이름*/}
          <Grid
            container
            sx={{
              borderStyle: "none none dashed",
              borderColor: "#BFC1C4",
              height: 100,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <Box sx={{ pl: 2 }}>이름</Box>
            </Grid>
            <Grid item xs={4}>
              <Box>{user_id}</Box>
            </Grid>
            <Grid item xs={4}>
              <Button>변경하기</Button>
            </Grid>
          </Grid>

          {/*닉네임*/}
          <Grid
            container
            sx={{
              borderStyle: "none none dashed",
              borderColor: "#BFC1C4",
              height: 100,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <Box sx={{ pl: 2 }}>닉네임</Box>
            </Grid>
            <Grid item xs={4}>
              <Box>환율짱짱</Box>
            </Grid>
            <Grid item xs={4}>
              <Button>변경하기</Button>
            </Grid>
          </Grid>
          {/*휴대전화번호*/}
          <Grid
            container
            sx={{
              borderStyle: "none none dashed",
              borderColor: "#BFC1C4",
              height: 100,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <Box sx={{ pl: 2 }}>휴대전화번호</Box>
            </Grid>
            <Grid item xs={4}>
              <Box>010-4791-5385</Box>
            </Grid>
            <Grid item xs={4}>
              <Button>변경하기</Button>
            </Grid>
          </Grid>
          {/*비밀번호 변경*/}
          <Grid
            container
            sx={{
              borderStyle: "none none dashed",
              borderColor: "#BFC1C4",
              height: 100,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={2}>
              <Box sx={{ pl: 8 }}>🔒</Box>
            </Grid>
            <Grid item xs={4}>
              <Box>비밀번호 설정</Box>
            </Grid>
            <Grid item xs={4}>
              <Button>비밀번호 변경하기</Button>
            </Grid>
          </Grid>

          {/*비밀번호변경*/}

          <Grid
            container
            sx={{
              mt: 12,
              dispaly: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              component="h1"
              id="font_test"
              sx={{
                background: "#E7E9ED",
                pl: 3,
                color: "rgba(0, 0, 0, 0.6)",
                height: "50px",
                fontWeight: "900",
                fontSize: "30px",
              }}
            >
              비밀번호 변경
            </Typography>
          </Grid>
          {/*현재비밀번호*/}
          <Grid
            container
            sx={{
              borderStyle: "none none dashed",
              borderColor: "#BFC1C4",
              height: 100,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <Box sx={{ pl: 2 }}>현재비밀번호</Box>
            </Grid>
            <Grid item xs={7}>
              <TextField
                placeholder="현재비밀번호 를 입력하세요"
                sx={{ width: 400 }}
              ></TextField>
            </Grid>
          </Grid>
          {/*변경비밀번호*/}
          <Grid
            container
            sx={{
              borderStyle: "none none dashed",
              borderColor: "#BFC1C4",
              height: 100,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <Box sx={{ pl: 2 }}>변경할 비밀번호</Box>
            </Grid>
            <Grid item xs={7}>
              <TextField
                placeholder="변경할 비밀번호 를 입력하세요"
                sx={{ width: 400 }}
              ></TextField>
            </Grid>
          </Grid>
          {/*비밀번호확인*/}
          <Grid
            container
            sx={{
              borderStyle: "none none dashed",
              borderColor: "#BFC1C4",
              height: 100,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <Box sx={{ pl: 2 }}>비밀번호확인</Box>
            </Grid>
            <Grid item xs={7}>
              <TextField
                placeholder="변경할 비밀번호를 입력하세요"
                sx={{ width: 400 }}
              ></TextField>
            </Grid>
          </Grid>
          <Box
            sx={{
              width: 1000,
              height: 200,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              id="font_test"
              sx={{ background: "#81CDFD", height: 50, mt: 5, mr: 3 }}
            >
              저장
            </Button>
            <Button
              id="font_test"
              sx={{ background: "#FAF8DF", height: 50, mt: 5, ml: 3 }}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProfileUpdate;
