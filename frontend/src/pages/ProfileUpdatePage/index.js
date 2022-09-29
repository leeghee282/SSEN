import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import EditName from "./EditName";
import EditNickname from "./EditNickname";
import EditPhoneNumber from "./EditPhoneNumber";
import EditPassword from "./EditPassword";
import Link from "@mui/material/Link";
import axios from "../../api/user";
import { baseURL } from "../../api";

const theme = createTheme();

const ProfileUpdate = () => {
  const [insertFlag1, setInsertFlag1] = useState(false);
  const [insertFlag2, setInsertFlag2] = useState(false);
  const [insertFlag3, setInsertFlag3] = useState(false);
  const [insertFlag4, setInsertFlag4] = useState(true);
  const [insertFlag5, setInsertFlag5] = useState(false);
  const [totalData, setTotalData] = useState({});
  const [userName, setUserName] = useState("배지우");
  const [userNickName, setUserNickName] = useState("환율짱짱");
  const [userPhoneNumber, setUserPhoneNumber] = useState("010-4791-5385");

  const insertClicked1 = () => {
    // 이름 변경

    insertComponentToggle1();
  };

  function insertComponentToggle1() {
    setInsertFlag1((insertFlag1) => !insertFlag1);
  }
  // 취소했을때, 값 변경 안되게 하기 위한함수
  function insertComponentToggle11() {
    getProfile();
    setInsertFlag1((insertFlag1) => !insertFlag1);
  }

  const insertClicked2 = () => {
    // 닉네임 변경

    insertComponentToggle2();
  };

  function insertComponentToggle2() {
    setInsertFlag2((insertFlag2) => !insertFlag2);
  }

  function insertComponentToggle22() {
    getProfile();
    setInsertFlag2((insertFlag2) => !insertFlag2);
  }

  const insertClicked3 = () => {
    // 전화번호 변경

    insertComponentToggle3();
  };

  function insertComponentToggle3() {
    setInsertFlag3((insertFlag3) => !insertFlag3);
  }

  function insertComponentToggle33() {
    getProfile();
    setInsertFlag3((insertFlag3) => !insertFlag3);
  }

  const insertClicked4 = () => {
    // 비밀번호변경

    insertComponentToggle4();
    console.log(insertFlag4, 4);
  };

  function insertComponentToggle4() {
    setInsertFlag4((insertFlag4) => !insertFlag4);
  }

  const getProfile = () => {
    axios
      .get(baseURL + `/api/v1/user/mypage/${sessionStorage.getItem("userId")}`)
      .then((response) => {
        setTotalData(response.data);
        console.log(123123);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
        <Box sx={{ mt: 15, width: 1000, height: 1100, background: "white" }}>
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
              <Box sx={{ pl: 2 }}>{totalData.userId}</Box>
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
            <Grid item xs={5}>
              {!insertFlag1 && <Box sx={{ pl: 2 }}>{totalData.name}</Box>}

              {insertFlag1 && (
                <Box
                  sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <EditName
                    cancelClicked={insertComponentToggle1}
                    cancelClicked11={insertComponentToggle11}
                    totalData={totalData}
                    setTotalData={setTotalData}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={3}>
              {!insertFlag1 && (
                <Button
                  sx={{
                    color: "#3C3C3D",
                    background: "#DEE0E4",
                    width: 80,
                    height: 40,
                  }}
                  id="font_test"
                  onClick={insertClicked1}
                >
                  변경하기
                </Button>
              )}
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
            <Grid item xs={5}>
              {!insertFlag2 && <Box sx={{ pl: 2 }}>{totalData.nickname}</Box>}

              {insertFlag2 && (
                <Box
                  sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <EditNickname
                    cancelClicked2={insertComponentToggle2}
                    cancelClicked22={insertComponentToggle22}
                    totalData={totalData}
                    setTotalData={setTotalData}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={3}>
              {!insertFlag2 && (
                <Button
                  sx={{
                    color: "#3C3C3D",
                    background: "#DEE0E4",
                    width: 80,
                    height: 40,
                  }}
                  id="font_test"
                  onClick={insertClicked2}
                >
                  변경하기
                </Button>
              )}
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
            <Grid item xs={5}>
              {!insertFlag3 && <Box sx={{ pl: 2 }}>{totalData.phone}</Box>}

              {insertFlag3 && (
                <Box
                  sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <EditPhoneNumber
                    cancelClicked3={insertComponentToggle3}
                    cancelClicked33={insertComponentToggle33}
                    totalData={totalData}
                    setTotalData={setTotalData}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={3}>
              {!insertFlag3 && (
                <Button
                  sx={{
                    color: "#3C3C3D",
                    background: "#DEE0E4",
                    width: 80,
                    height: 40,
                  }}
                  id="font_test"
                  onClick={insertClicked3}
                >
                  변경하기
                </Button>
              )}
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
            <Grid item xs={3}>
              <Box sx={{ pl: 8 }}>🔒</Box>
            </Grid>
            <Grid item xs={4}>
              <Box>비밀번호 설정</Box>
            </Grid>
            <Grid item xs={4}>
              {insertFlag4 && !insertFlag5 && (
                <Button
                  id="font_test"
                  onClick={insertClicked4}
                  variant="contained"
                  color="warning"
                  size="large"
                >
                  비밀번호 변경하기
                </Button>
              )}
              {insertFlag4 && insertFlag5 && (
                <Typography id="font_test" sx={{ color: "blue" }}>
                  비밀번호 변경이 완료되었습니다.
                </Typography>
              )}
            </Grid>
          </Grid>
          {!insertFlag4 && (
            <EditPassword
              insertFlag5={insertFlag5}
              setInsertFlag5={setInsertFlag5}
              insertFlag4={insertFlag4}
              setInsertFlag4={setInsertFlag4}
              cancelClicked4={insertComponentToggle4}
              totalData={totalData}
              setTotalData={setTotalData}
            ></EditPassword>
          )}
          {insertFlag4 && (
            <Box
              sx={{
                width: 1000,
                height: 200,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link href="/">
                <Button
                  id="font_test"
                  sx={{ background: "#81CDFD", height: 50, mt: 5, mr: 3 }}
                >
                  저장
                </Button>
              </Link>
              <Link href="/">
                <Button
                  id="font_test"
                  sx={{ background: "#FAF8DF", height: 50, mt: 5, ml: 3 }}
                >
                  취소
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProfileUpdate;
