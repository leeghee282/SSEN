import React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useState } from 'react';
import axios from '../../api/user';
import { baseURL } from '../../api';

const EditName = (props) => {
  const { setTotalData, totalData, cancelClicked, cancelClicked11 } = props;

  const onChange = (e) => {
    setTotalData({ ...totalData, name: e.target.value });
  };

  const onClickHandler = () => {
    axios.put(baseURL + '/api/v1/user/edit', totalData).then((response) => {
      // console.log(response)
      if (response.status === 200) {
        sessionStorage.setItem('name', totalData.name);
        window.location.replace('/profileupdate');
      }
    });

    cancelClicked();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <TextField
        id="font_test"
        onChange={onChange}
        defaultValue={totalData.name}
        placeholder="이름을 변경하세요"
      ></TextField>
      <Button
        id="font_test"
        sx={{ ml: 6, color: '#3C3C3D', background: '#F3F6FA' }}
        onClick={onClickHandler}
      >
        저장
      </Button>{' '}
      <Button
        id="font_test"
        sx={{ ml: 1, color: 'red', background: '#F3F6FA' }}
        onClick={cancelClicked11}
      >
        취소
      </Button>
    </Box>
  );
};

export default EditName;
