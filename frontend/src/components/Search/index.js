import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { baseNewsURL } from '../../api/index';
import { Typography, Box, Link, Grid, Container, Avatar } from '@mui/material';
import { useLocation } from 'react-router-dom';

import Loading from '../Loading';
import Post from './Post';
import Paging from './Paging';

function Search() {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [noneDataFlag, setNoneDataFlag] = useState(false); // 데이터가 있는지 없는지 확인하는 곳
  const navigate = useNavigate();
  const [word, setWord] = useState(''); //검색어
  const [posts, setPosts] = useState([]); //검색된 리스트
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [postPerPage] = useState(10);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  console.log(location, '로케');

  const onChange = (e) => {
    setWord(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    navigate('/search', {
      state: {
        search: word,
      },
    });
    setWord(''); //submit 후 창 비우기
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      setWord(word);
      onSubmit(e);
    }
  };

  const data = [
    '한국',
    '미국',
    '중국',
    '일본',
    '경제',
    '뉴스',
    '국민',
    '뉴욕',
    '코로나',
  ];
  const pick = Math.floor(Math.random() * data.length);
  console.log(data[pick], '엥');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await axios.get(
          baseNewsURL + `/news/search2/${location.state.search}`,
        );
        setPosts(result.data);
        setNoneDataFlag(false);
        setLoading(false);
      } catch (e) {
        setNoneDataFlag(true);
        setLoading(false);
      }
    }
    fetchData();
  }, [location]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {/* <form className="search-form">
            <input
              className="search-input"
              type="text"
              onChange={onChange}
              onKeyDown={keyDownHandler}
              value={word}
              placeholder="검색어를 입력해주세요"
            />
            <button className="search-btn" onClick={onSubmit}>
              <img className="search-btn-img" src="/images/search.png"></img>
            </button>
          </form> */}
          {noneDataFlag && (
            <Box>
              <p className="jb-default-3 fc-grey" id="font_test">
                <span className="search-keyword">"{data[pick]}"</span>
                <span className="jb-smaller">
                  (으)로 검색해보는 건 어떠세요?
                </span>
              </p>
              <Avatar
                src="images/nosearch.png"
                variant="square"
                sx={{
                  ml: 45,
                  width: '40%',
                  height: '20%',
                  justifyContent: 'center',
                }}
              ></Avatar>
            </Box>
          )}
          {!noneDataFlag && (
            <div>
              <Post
                posts={currentPosts}
                loading={loading}
                search={location.state.search}
              />
              <Paging
                totalCount={posts.length}
                postPerPage={postPerPage}
                postRangeDisplayed={10}
                handlePageChange={handlePageChange}
                page={currentPage}
                loading={loading}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
