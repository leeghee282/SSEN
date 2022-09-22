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

  const initialValues = {
    
    password: "",
    changePassword:"",
    confirmChangePassword: "",
    
  };
  
  const {insertFlag4,setInsertFlag4,insertFlag5,setInsertFlag5,cancelClicked4} = props;
  const [changePassword,setChangePassword] = useState('');
  const [confirmChangePassword,setConfirmChangePassword] = useState('');
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});


  


  const validate = () => {
    console.log(formValues.changePassword)
    const errors = {};
    if (!formValues.password) {
      errors.password = "비밀번호를 입력해주세요.";
      
    }

    if (!formValues.changePassword) {
      errors.changePassword = "변경비밀번호를 입력해주세요.";
      console.log(errors.changePassword)
    }

    if (!formValues.confirmChangePassword) {
      errors.confirmChangePassword = "변경비밀번호확인 입력해주세요.";
      console.log(errors.confirmChangePassword)
      
    }

    if (formValues.changePassword !== formValues.confirmChangePassword) {
      errors.checkPassword = "변경비밀번호가 같지않습니다."
      console.log(errors.checkPassword)
    }
    setFormErrors(errors);
    if (!(errors.changePassword + errors.confirmChangePassword + errors.checkPassword + errors.password)) {
      return true;
    }
    return false;
    
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    if(validate()) {
      insertClicked5();
    }
  };

   //비밀번호 변경 폼 입력 
   const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    //setFormErrors(validate(event.target));
  };

  

   // 비밀번호 변경
  const onChangeChangePassword = (e) => {
    setChangePassword(( ) => e.target.value);
    console.log(changePassword)
  };

  // 비밀번호 변경확인
  const onChangeConfirmChangePassword = (e) => {
    setConfirmChangePassword(( ) => e.target.value);
    console.log(confirmChangePassword)
  };

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
        <Grid item xs={5}>
          <TextField
            name="password"
            onChange={handleChange}
            placeholder="현재비밀번호 를 입력하세요"
            sx={{ width: 400 }}
          ></TextField>
          
        </Grid>
        <Grid item xs={3}>
          <Typography id="font_test" sx={{color:"red",pl:1}}>{formErrors.password}</Typography>
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
        <Grid item xs={5}>
          <TextField
            name="changePassword"
            onChange={handleChange}
            placeholder="변경할 비밀번호 를 입력하세요"
            sx={{ width: 400 }}
          ></TextField>
        </Grid>
        <Grid item xs={3}><Typography id="font_test" sx={{color:"red",pl:1}}>{formErrors.changePassword}</Typography></Grid>
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
        <Grid item xs={5}>
          <TextField
            onChange={handleChange}
            
            name="confirmChangePassword"
            placeholder="변경할 비밀번호를 입력하세요"
            sx={{ width: 400 }}
          ></TextField>
        </Grid>
        <Grid item xs={3}><Typography id="font_test" sx={{color:"red",pl:1}} >{formErrors.checkPassword}</Typography></Grid>
      </Grid>
      <Box
            sx={{
              width: 1000,
              height: 200,
              display: "flex",
              justifyContent: "center",
            }}
          >
            
            <Button onClick={handleSubmit}
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
