import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const EditPassword = (props) => {
  
  const {insertFlag4,setInsertFlag4,insertFlag5,setInsertFlag5,cancelClicked4} = props;

  //등록완료 상태관리 Flag5 (유효성 검사 후 마지막 상태변화 필요 ! )
  const insertClicked5 =() =>{

    insertComponentToggle5();
  }

  function insertComponentToggle5() {
    setInsertFlag5((insertFlag5) => !insertFlag5);
    setInsertFlag4((insertFlag4) => !insertFlag4);
  }
  

  return (
    <Box >
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
            
            <Button onClick={insertClicked5}
              id="font_test"
              sx={{ background: "#81CDFD", height: 50, mt: 5, mr: 3 }}
            >
              비밀번호 변경완료
            </Button>
            
            <Button 
              onClick ={cancelClicked4}
              id="font_test"
              sx={{ background: "#FAF8DF", height: 50, mt: 5, ml: 3 }}
            >
              취소
            </Button>
          </Box>
    
      
    </Box>
  );
};

export default EditPassword;
