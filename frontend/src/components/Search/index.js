import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { baseNewsURL } from "../../api/index";
import Pagination from "./SearchPagination";
import { Typography, Box, Link, Grid, Container } from "@mui/material";
import { useLocation } from "react-router-dom";

function Search() {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [search, setSearch] = useState(""); //검색어
  const [lists, setLists] = useState([]); //검색한 리스트 저장할 곳

  const location = useLocation();
  console.log(location);

  //값 받기

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
          <option value="5">5</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>

      <main>
        {lists
          .slice(offset, offset + limit)
          .map(({ title, content, time, url, press }) => (
            <Grid container>
              <Grid item xs={12}>
                <Link
                  href={url}
                  target="_blank"
                  sx={{ textDecoration: "none", color: "black" }}
                >
                  <Box className="card" key={time}>
                    <Grid sx={{ borderBottom: "1px dashed black" }} container>
                      <Grid item xs={10}>
                        <Typography
                          id="font_test"
                          fontSize="30px"
                          sx={{
                            height: "60px",
                          }}
                        >
                          {title.length >= 1
                            ? title.replaceAll("…", " ").substr(0, 30) + "..."
                            : title}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Grid container direction="column">
                          <Grid id="font_test" item xs={2}>
                            {press}
                          </Grid>
                          <Grid id="font_test" sx={{ mt: 1 }} item xs={10}>
                            {time.replaceAll("\u0000", "")}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid sx={{ pl: 1 }} item xs={11}>
                      <Typography id="font_Gmarket">
                        {content.length >= 150
                          ? content.substr(0, 150) + "..."
                          : content}
                      </Typography>
                    </Grid>
                  </Box>
                </Link>
              </Grid>
            </Grid>
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
