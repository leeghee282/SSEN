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
            xs={10}
            sx={{ textAlign: 'center', fontSize: 40, my: 2, mx: 2 }}
          >
            키워드 분석 결과
          </Grid>
          {searchList.map((search, index) => {
            return (
              <Grid item xs={5} sx={{ mx: 2, my: 1 }}>
                <Card
                  sx={{
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
                    <li id="searchdate">{search.date}</li>
                    <li>일치율: {search.similarity}%</li>
                    <li>
                      주요통화 변화율:{' '}
                      <span
                        style={{ color: search.variance > 0 ? 'red' : 'blue' }}
                      >
                        {search.currencyCode} {search.variance}%
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
