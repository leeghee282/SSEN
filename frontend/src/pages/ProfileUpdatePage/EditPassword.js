import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { baseURL } from "../../api";
import axios from "../../api/user";

import "./style.css";

const EditPassword = (props) => {
  const getUserPassword = () => {
    axios
      .get(baseURL + `/api/v1/user/mypage/${sessionStorage.getItem("userId")}`)
      .then((response) => console.log(response));
  };




  const initialValues = {
    password: "",
    changePassword: "",
    confirmChangePassword: "",
  };

  const {
    insertFlag4,
    setInsertFlag4,
    insertFlag5,
    setInsertFlag5,
    cancelClicked4,
    totalData,
    setTotalData,
  } = props;
  const [changePassword, setChangePassword] = useState("");
  const [confirmChangePassword, setConfirmChangePassword] = useState("");
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [checkPassword, setCheckPassword] = useState(true);
  //현재비밀번호 입력시 데이터베이스와 같은지 확인


  const checkNowPassword = async () => {

    const body = {

      password: formValues.password,
      userId: sessionStorage.getItem('userId')
    }

    try {
      console.log(body)
      await axios
        .post(baseURL + `/api/v1/user/login`, body)
        .then((response) => { console.log(response, 33333333) })


      insertClicked5()

      const body2 = {
        newPassword: formValues.changePassword,
        password: formValues.password,
        userId: sessionStorage.getItem('userId')
      }

      axios
        .put(baseURL + '/api/v1/user/edit/password', body2)
        .then((response) => console.log(response))
    }
    catch (e) {
      if (e.response.status === 401) {
        setFormErrors({ ...formErrors, 'password': "비밀번호일치하지않음" });

      }

    }
  }

  const validate = () => {
    const errors = {};





    if (!formValues.password) {
      errors.password = "비밀번호를 입력해주세요.";
    }

    if (!formValues.changePassword) {
      errors.changePassword = "새 비밀번호를 입력해주세요.";
      console.log(errors.changePassword);
    }



    if (formValues.changePassword !== formValues.confirmChangePassword) {
      errors.confirmChangePassword = "새 비밀번호가 일치하지 않습니다.";

    }



    setFormErrors(errors);

    if (
      !(
        errors.changePassword +
        errors.confirmChangePassword +
        errors.checkPassword +
        errors.password
      )
    ) {

      return true;
    }

    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    if (validate()) {
      checkNowPassword()

    }
  };

  //비밀번호 변경 폼 입력
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormErrors({ ...formErrors, [name]: '' })
    setFormValues({ ...formValues, [name]: value });
    //setFormErrors(validate(event.target));
  };

  // 비밀번호 변경
  const onChangeChangePassword = (e) => {
    setChangePassword(() => e.target.value);
    console.log(changePassword);
  };

  // 비밀번호 변경확인
  const onChangeConfirmChangePassword = (e) => {
    setConfirmChangePassword(() => e.target.value);
    console.log(confirmChangePassword);
  };

  //등록완료 상태관리 Flag5 (유효성 검사 후 마지막 상태변화 필요 ! )
  const insertClicked5 = () => {
    insertComponentToggle5();
  };

  function insertComponentToggle5() {
    setInsertFlag5((insertFlag5) => !insertFlag5);
    setInsertFlag4((insertFlag4) => !insertFlag4);
  }

  return (
    <Box>
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
            height: "60px",
            fontWeight: "900",
            fontSize: "30px",
            // textAlign: "center",
            display: "flex",
            alignItems: "center"
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
          <Box sx={{ pl: 2 }}>현재 비밀번호</Box>
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="현재 비밀번호를 입력하세요"
            sx={{ width: 400 }}
          ></TextField>
        </Grid>
        <Grid item xs={3}>
          <Typography id="font_test" sx={{ color: "red", pl: 1 }}>
            {formErrors.password}
          </Typography>
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
          <Box sx={{ pl: 2 }}>새 비밀번호</Box>
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="password"
            name="changePassword"
            onChange={handleChange}
            placeholder="새 비밀번호를 입력하세요"
            sx={{ width: 400 }}
          ></TextField>
        </Grid>
        <Grid item xs={3}>
          <Typography id="font_test" sx={{ color: "red", pl: 1 }}>
            {formErrors.changePassword}
          </Typography>
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
          <Box sx={{ pl: 2 }}>비밀번호 확인</Box>
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="password"
            onChange={handleChange}
            name="confirmChangePassword"
            placeholder="새 비밀번호를 입력하세요"
            sx={{ width: 400 }}
          ></TextField>
        </Grid>
        <Grid item xs={3}>
          <Typography id="font_test" sx={{ color: "red", pl: 1 }}>
            {formErrors.confirmChangePassword}
          </Typography>
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
          onClick={handleSubmit}
          className="btn-st btn-st-save"
          id="font_test"
          sx={{
            background: "#81CDFD", height: 45, mt: 3, mr: 3, pl: 3, pr: 3,

          }}
        >
          변경
        </Button>

        <Button
          onClick={cancelClicked4}
          className="btn-st btn-st-cancel"
          id="font_test"
          sx={{ background: "#f7f096", height: 45, mt: 3, ml: 3, pl: 3, pr: 3, color: "rgba(0, 0, 0, 0.6)", }}
        >
          취소
        </Button>
      </Box>
    </Box >
  );
};

export default EditPassword;
