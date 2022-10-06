import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Typography, Box, Link, Grid, Container, Card } from '@mui/material';

import { getPastData, getPastDatalist } from '../../_actions/past_action';
import Spinner from '../Loading/Spinner';
import Loading from '../Loading';

function PastSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const keywordList = useSelector((state) => state.chartReducer.keywords);
  const pastDatalist = useSelector((state) => state.pastReducer.pastDatalist);

  const [searchList, setSearchList] = useState([]);
  const [pastLoading, setPastLoading] = useState(false);

  useEffect(() => {
    pastLoadingChange();
    onSetPastSearchResult();
  }, [location]);

  const onSetPastSearchResult = async () => {
    await dispatch(getPastDatalist(keywordList)).then((response) => {
      console.log(response.payload);
      setSearchList(response.payload);
      pastLoadingChange();
    });
  };

  const pastLoadingChange = () => {
    setPastLoading((current) => !current);
  };

  const pastClickHandler = (event, key) => {
    navigate('/pastdetail', { state: { searchData: pastDatalist[key] } });
    // dispatch(getPastData()).then((response) => {
    //   console.log(response.payload);
    // });
  };

  return (
    <div>
      {pastLoading ? (
        <Loading />
      ) : (
        <Grid container id="searchlist">
          <Grid
            item
            xs={12}
            sx={{ textAlign: 'center', fontSize: 40, my: 2, mx: 2 }}
          >
            키워드 분포 유사도 분석
          </Grid>
          <Grid item xs={12}>
            <Typography id="font_test" sx={{ textAlign: 'center', fontSize: 20, my: 2, mx: 2 }}>본 페이지는 검색한 구간의 키워드와 비슷한 분포를 가진 날짜 목록을 제공합니다.</Typography>
          </Grid>
          {searchList.map((search, index) => {
            return (
              <Grid item xs={4} >
                <Card
                  sx={{
                    m:1,
                    padding: 2,
                    '&:hover': {
                      background: '#DEE0E4',
                    },
                  }}
                >
                  <ul
                    onClick={(event) => pastClickHandler(event, index)}
                    style={{ cursor: 'pointer' }}
                    key={index}
                  >
                    <Grid container>
                      <Grid item xs={8}>
                    <li id="searchdate">{search.date}</li>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>더보기</Typography>
                    </Grid>
                    </Grid>
                    <li>일치율: {search.similarity}%</li>
                    <li>
                      주요통화:{' '}
                      <span
                        style={{ color: 'black' }}
                      >
                        {search.currencyCode}
                      </span>
                    </li>
                    <li>
                      변화율:{' '}
                      <span
                        style={{ color: search.variance > 0 ? 'red' : 'blue' }}
                      >
                        {search.variance}%
                      </span>
                    </li>
                  </ul>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}
export default PastSearch;
