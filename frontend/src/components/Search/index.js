import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { baseNewsURL } from "../../api/index";
import { Typography, Box, Link, Grid, Container, Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";

import Loading from "../Loading";
import Post from "./Post";
import Paging from "./Paging";

function Search() {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [noneDataFlag, setNoneDataFlag] = useState(false); // 데이터가 있는지 없는지 확인하는 곳
  const [search, setSearch] = useState(""); //검색어
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [postPerPage] = useState(10);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const [lists, setLists] = useState([
    // {
    //   title: "제목은 어쩌구저쩌구",
    //   content:
    //     "내용은 어쩌구저쩌구sssssssssssㄴㅇㄻㄴㅇㄻㅈㄷㄱㅈㄷㄱㅈㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅈㄷㄱㅈㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅈㄷㄱㄴㅇㄹㄴㅇㄹㄴㅇㅈㄷㄱㅈㄹㄴㄹㄴssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdㄴㅇㄻㅇㄴㄹㅈㄷㄱㅈㄷㄱㅈㄷㄴㅇㄹㄴㅇㅁㄻㄴㅇㄹㄴㄹㄴㅁㄻㄴㅇss",
    //   time: "2022-09-01",
    //   url: "www.naver.com",
    //   press: "한국일보",
    // },
    // {
    //   title: "제목은 어쩌구저쩌구",
    //   content: "내용은 어쩌구저쩌구",
    //   time: "2022-09-01",
    //   url: "www.naver.com",
    //   press: "한국일보",
    // },
  ]); //검색한 리스트 저장할 곳
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const data = [
    "한국",
    "미국",
    "중국",
    "일본",
    "경제",
    "뉴스",
    "국민",
    "뉴욕",
    "코로나",
  ];
  const pick = Math.floor(Math.random() * data.length);

  useEffect(() => {
    async function fetchData() {
      console.log(location.state.search, "확인용");
      setLoading(true);
      try {
        const result = await axios.get(
          baseNewsURL + `/news/search/${location.state.search}`
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
          {noneDataFlag && (
            <Box>
              <Avatar
                src="images/nosearch.png"
                variant="square"
                sx={{
                  ml: 30,
                  width: "50%",
                  height: "30%",
                }}
              ></Avatar>
              <Typography>추천 검색어 : {data[pick]}</Typography>
            </Box>
          )}
          {!noneDataFlag && (
            <div >
              <Post posts={currentPosts} loading={loading} search={location.state.search}/>
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
