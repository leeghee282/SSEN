import React, { useRef, useState, useEffect } from 'react';
import MyInterestModal from './MyInterestModal';
import MyInterestItemList from './MyInterestItemList';
import axios from '../../api/user';
import { baseURL } from '../../api/index';
import './style.css';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

export default function MyInerest() {
  // 임시 데이터

  const [interests, setInterests] = useState([]);
  const [live, setLive] = useState([]);
  const [updateInts, setUpdateInts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  // 서버에서 관심화폐 받아오기(get방식)
  const getInterest = () => {
    axios
      .get(baseURL + `/api/v1/intrcurr/${sessionStorage.getItem('userId')}`)
      .then((response) => {
        setInterests(response.data);
        //    console.log(response.data,"asdsds");
      });
  };
  useEffect(() => {
    getInterest();
  }, []);

  useEffect(() => {}, [interests]);

  // 서버에서 실시간 환율 받아오기(get방식)
  const getLiveData = () => {
    axios.get(`/api/v1/live/`).then((response) => setLive(response.data));
  };
  useEffect(() => {
    getLiveData();
  }, []);

  useEffect(() => {}, [live]);

  // const onUpdate = (nation, interestCurrency) => {
  //   const updateInt = {
  //     nation,
  //     interestCurrency,
  //   };
  //   setUpdateInts(updateInts.concat(updateInt));
  // };

  // 삭제 기능
  const onRemove = (id) => {
    setInterests(interests.filter((interest) => interest.id !== id));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: "center",
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <h1 className="myInterest-titls, ff-b fs-myInterest-title fc-dark-grey">
          관심 화폐
        </h1>
        <Avatar
          sx={{
            mt: 2.5,
            ml: 2,
            width: 'auto',
            height: '30px',
            cursor: 'pointer',
          }}
          src="/images/questionlogo2.png"
          className="infobutton6"
        ></Avatar>
        <Typography
          sx={{ ml: 19, mt: 5 }}
          className="info6"
          id="font_test"
          fontSize="14px"
        >
          - 화폐별 목표 금액을 설정합니다. <br></br>- 해당 금액에 도달하면
          Push알림이 뜹니다.<br></br>
          <br></br>* 화폐별로 목표금액은 3개까지만 입력 가능합니다.<br></br>*
          Push알림은 1분당 한번씩 뜹니다.
        </Typography>
      </Box>
      {interests.length !== 0 && (
        <button
          id="font_test"
          className="custom-btn btn-3"
          onClick={handleOpen}
        >
          <span>+ 관심 화폐 등록</span>
        </button>
      )}
      <MyInterestModal
        getInterest={getInterest}
        handleOpen={handleOpen}
        open={open}
        setOpen={setOpen}
      />
      <MyInterestItemList
        live={live}
        handleOpen={handleOpen}
        interests={interests}
        getInterest={getInterest}
        onRemove={onRemove}
      />
    </Box>
  );
}
