import React, { useContext, useEffect, useRef, useState } from 'react';
import BasicModal from './MyAssetModal';
import MyAssetItemList from './MyAssetItemList';
import MyAssetTotal from './MyAssetTotal';
import MyAssetChart from './MyAssetChart';
import './style.css';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';

import axios from '../../api/user';

export default function MySet() {
  const [myAsset, setMyAsset] = useState([]);
  const [live, setLive] = useState([]);
  const [filterBaseCode, setFilterBaseCode] = useState('All');

  // 삭제 기능
  const myAssetRemove = (uid) => {
    setMyAsset(myAsset.filter((asset) => asset.uid !== uid));
  };

  // 서버에서 보유 통화 받아오기(get방식)
  const getMyAssetData = () => {
    axios
      .get(`/api/v1/holdcurr/${sessionStorage.getItem('userId')}`)
      .then((response) => setMyAsset(response.data));
  };
  useEffect(() => {
    getMyAssetData();
  }, []);

  useEffect(() => {}, [myAsset]);

  // 서버에서 실시간 환율 받아오기(get방식)
  const getLiveData = () => {
    axios.get(`/api/v1/live/`).then((response) => setLive(response.data));
  };
  useEffect(() => {
    getLiveData();
  }, []);

  useEffect(() => {}, [live]);

  // 국가별로 필터 기능
  const filteredItems = myAsset.filter((asset) => {
    if (filterBaseCode === 'All') {
      return true;
    }
    return asset.code === filterBaseCode;
  });

  // 국가별 필터 선택 함수
  const filterChangeHandler = (selectedCode) => {
    setFilterBaseCode(selectedCode);
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
        <h1 className="myAsset-title ff-b fs-myAsset-title fc-dark-grey">
          보유 외화
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
          className="infobutton5"
        ></Avatar>
        <Typography
          sx={{ ml: 19, mt: 5 }}
          className="info5"
          id="font_test"
          fontSize="14px"
        >
          - 현재 보유 외화를 등록하면 실시간 환율과 비교해 손익을 계산해 줍니다.
          <br></br>- 그래프를 통해 시각적으로 현재 보유 화폐 통계를 제공합니다.
        </Typography>
      </Box>
      {/* 보유 외화 목록 입력(모달) */}
      <BasicModal getMyAssetData={getMyAssetData} />
      {/* 보유 외화 목록 전체 금액 */}
      <MyAssetTotal
        myAsset={myAsset}
        live={live}
        getMyAssetData={getMyAssetData}
        getLiveData={getLiveData}
        filteredItems={filteredItems}
        filterBaseCode={filterBaseCode}
      />
      <br />
      {/* 보유 외화 목록 리스트 */}
      {filteredItems && myAsset.length > 0 ? (
        <MyAssetItemList
          myAsset={myAsset}
          live={live}
          key={myAsset.uid}
          myassetremove={myAssetRemove}
          getMyAssetData={getMyAssetData}
          getLiveData={getLiveData}
          onChangeFilter={filterChangeHandler}
          filterBaseCode={filterBaseCode}
          filteredItems={filteredItems}
        />
      ) : (
        '보유 외화를 입력해주세요 🙅'
      )}
    </Box>
  );
}
