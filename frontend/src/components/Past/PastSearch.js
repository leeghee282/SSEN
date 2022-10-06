import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Typography, Box, Link, Grid, Container, Card } from '@mui/material';

import { getPastData, getPastDatalist } from '../../_actions/past_action';
import Spinner from '../Loading/Spinner';
import Loading from '../Loading';
import './style.css';

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
            sx={{
              textAlign: 'center',
              fontSize: 40,
              my: 2,
              mx: 2,
            }}
          >
            <span className="font_zz">키워드 분포 유사도</span>
            <span> 분석</span>
          </Grid>
          <Grid item xs={12}>
            <Typography
              id="font_test"
              sx={{ textAlign: 'center', fontSize: 20, my: 2, mx: 2 }}
            >
              본 페이지는 검색한 구간의 키워드와 비슷한 분포를 가진 날짜 목록을
              제공합니다.
            </Typography>
          </Grid>
          {searchList.map((search, index) => {
            return (
              <Grid item xs={12}>
                <Card
                  sx={{
                    m: 1,
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
                    <Grid
                      container
                      sx={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {/* <Grid item xs={2.5}>
                        <Typography
                          id="font_test"
                          sx={{ marginBottom: '10px', color: '#444444' }}
                        >
                          일치율
                        </Typography>
                        <li id="searchdate2">{search.similarity}%</li>
                      </Grid>
                      <Grid item xs={2.5}>
                        <Typography
                          id="font_test"
                          sx={{ marginBottom: '10px', color: '#444444' }}
                        >
                          날짜
                        </Typography>
                        <li id="searchdate">{search.date}</li>
                      </Grid>
                      <Grid item xs={2.5}>
                        <Typography
                          id="font_test"
                          sx={{ marginBottom: '10px', color: '#444444' }}
                        >
                          통화
                        </Typography>
                        <li id="searchdate">{search.currencyCode}</li>
                      </Grid>
                      <Grid item xs={2.5}>
                        <Typography
                          id="font_test"
                          sx={{ marginBottom: '10px', color: '#444444' }}
                        >
                          변화율
                        </Typography>
                        <li
                          id="searchdate"
                          style={{
                            color: search.variance > 0 ? '#FF5B5B' : '#604fdc',
                          }}
                        >
                          {search.variance}%
                        </li>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography id="font_test">더보기</Typography>
                      </Grid> */}
                      {/* <Grid
                        container
                        sx={{ justifyContent: 'center', textAlign: 'center' }}
                      > */}
                      <Grid item xs={2.5}>
                        <Typography id="font_test" sx={{ color: '#444444' }}>
                          일치율
                        </Typography>
                      </Grid>
                      <Grid item xs={2.5}>
                        <Typography id="font_test" sx={{ color: '#444444' }}>
                          날짜
                        </Typography>
                      </Grid>
                      <Grid item xs={2.5}>
                        <Typography id="font_test" sx={{ color: '#444444' }}>
                          통화
                        </Typography>
                      </Grid>
                      <Grid item xs={2.5}>
                        <Typography id="font_test" sx={{ color: '#444444' }}>
                          변화율
                        </Typography>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      {/* test */}
                      <Grid item xs={2.5}>
                        <li id="searchdate2">{search.similarity}%</li>
                      </Grid>
                      <Grid item xs={2.5}>
                        <li id="searchdate">{search.date}</li>
                      </Grid>
                      <Grid item xs={2.5}>
                        <li id="searchdate">{search.currencyCode}</li>
                      </Grid>
                      <Grid item xs={2.5}>
                        <li
                          id="searchdate"
                          style={{
                            color: search.variance > 0 ? '#FF5B5B' : '#604fdc',
                          }}
                        >
                          {search.variance}%
                        </li>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        sx={{ color: '#444444', marginBottom: '10px' }}
                      >
                        더보기
                      </Grid>
                      {/* </Grid> */}
                    </Grid>
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
