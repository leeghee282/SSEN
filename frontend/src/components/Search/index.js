import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { baseNewsURL } from "../../api/index";
import Pagination from "./SearchPagination";
import { Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function Search() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [search, setSearch] = useState(""); //검색어
  const [lists, setLists] = useState([]); //검색한 리스트 저장할 곳

  const location = useLocation();
  console.log(location);

  //값 받기

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(search, "서치페이지 검색");
    e.preventDefault();

    try {
      await axios
        .get(baseNewsURL + `/news/search/${search}/2022-09-11/2022-09-15`)
        .then((response) => setLists(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      console.log(location.state.search, "배지우");
      const result = await axios.get(
        baseNewsURL +
          `/news/search/${location.state.search}/${location.state.startDate}/${location.state.endDate}/`
      );
      console.log(result, 33);
      setLists(result.data);
    }
    fetchData();
  }, [location]);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((data) => {

  //       setPosts(data)
  //     });
  // }, []);

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={handleChange}
          placeholder="검색어를 입력해주세요"
        />
        <button onClick={handleSubmit}></button>
      </form>
      <header>
        <h1>게시물 목록</h1>
      </header>

      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>

      <main>
        {lists.slice(offset, offset + limit).map(({ title, content, time }) => (
          <Box className="card" key={time}>
            <Typography fontSize="30px" sx={{ height: "60px" }}>
              {title.length >= 40 ? title.substr(0, 40) + "..." : title}
            </Typography>
            <Typography>
              {content.length >= 50 ? content.substr(0, 50) + "..." : content}
            </Typography>
          </Box>
        ))}
      </main>

      <footer>
        <Pagination
          total={lists.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>
  );
}

export default Search;
