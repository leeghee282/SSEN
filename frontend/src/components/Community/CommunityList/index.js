// chat form, list 컴포넌트 보여주는 곳

import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../../api/user';
import CommunityForm from '../CommunityForm';
import Community from '..';
import './style.css';

import { Avatar } from '@mui/material';

function CommunityList(props) {
  const currencyCode = useSelector((state) => state.chartReducer.chartCode);
  const [community, setCommunity] = useState([]);

  // 서버에서 채팅 받아오기(get방식)
  const getCommunity = () => {
    axios
      .get('/api/v1/chat', { params: { currencyCode: currencyCode } })
      .then((response) => setCommunity(response.data));
  };
  useEffect(() => {
    getCommunity();
  }, [currencyCode]);

  useEffect(() => {}, [community]);

  // 삭제 기능
  const removeCommunity = (uid) => {
    setCommunity(community.filter((commu) => commu.uid !== uid));
  };
  ////////유정
  const [ScrollY, setScrollY] = useState(props.ScrollY); // window 의 pageYOffset값을 저장
  //console.log(ScrollY, '채팅 움직임');
  const [ScrollActive, setScrollActive] = useState(props.ScrollActive);
  function handleScroll() {
    // if (!ScrollActive) {
      if (ScrollY > 30) {
        setScrollY(window.pageYOffset);
        setScrollActive(true);
      } 
      
      else {
        setScrollY(window.pageYOffset);
        setScrollActive(false);
      }
    } 

  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  return (
    <>
      <div className={ScrollActive ? 'timeLineWrap2' : 'timeLineWrap'}>
        {/* <Avatar
          src="images/ssenchat3.png"
          sx={{
            mt: '20px',
            mb: '15px',
            ml: '120px',
            width: '150px',
            justifyContent: 'center',
          }}
          variant="square"
        /> */}
        {currencyCode === 'USD' && <p className="chatCodeTitle">달러/원</p>}
        {currencyCode === 'EUR' && <p className="chatCodeTitle">유로/원</p>}
        {currencyCode === 'GBP' && <p className="chatCodeTitle">파운드/원</p>}
        {currencyCode === 'JPY' && <p className="chatCodeTitle">엔/원</p>}
        {currencyCode === 'CNY' && <p className="chatCodeTitle">위안/원</p>}
        <CommunityForm getCommunity={getCommunity} />
        <Community
          community={community}
          key={community.content}
          removeCommunity={removeCommunity}
          getCommunity={getCommunity}
        />
      </div>
    </>
  );
}

export default CommunityList;
