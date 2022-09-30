import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Stack, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import NewsDetail from "./NewsDetail";

function News() {
  // const newsList = useSelector((state) => state.chartReducer.news);

  // const [page, setPage] = useState(1);
  // const [data, setData] = useState([]);
  // const [lastPage, setLastPage] = useState();

  // useEffect(() => {
  //   const getLastPage =
  //     newsList.length % 5 === 0
  //       ? parseInt(newsList.length / 5)
  //       : parseInt(newsList.length / 5) + 1;

  //   setLastPage(getLastPage);

  //   if (page === getLastPage) {
  //     setData(newsList.slice(5 * (page - 1)));
  //   } else {
  //     setData(newsList.slice(5 * (page - 1), 5 * (page - 1) + 5));
  //   }
  // }, [page]);

  // const handlePage = (event) => {
  //   const nowPageInt = parseInt(event.target.outerText);
  //   setPage(nowPageInt);
  // };

  return (
    <div>
      {/* <Stack alignItems="center">
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ flexWrap: "wrap" }}
        >
          {data.map((el) => {
            return (
              <Stack
                key={el.id}
                alignItems="center"
                textAlign="center"
                sx={{
                  width: 450,
                  border: 1,
                  margin: 3,
                  padding: -0.1,
                  borderRadius: 4,
                  boxShadow: "1px 1.5px gray",
                  "&:hover": {
                    boxShadow: "2px 2px 2px 2px gray",
                    transform: "translate(-1px, -1px)",
                  },
                }}
              >
                <Link
                  to={`/list/${el.id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "100%",
                  }}
                >
                  <NewsDetail data={el} />
                </Link>
              </Stack>
            );
          })}
        </Stack>
        <Pagination
          count={lastPage}
          defaultPage={1}
          boundaryCount={2}
          color="primary"
          size="large"
          sx={{ margin: 2 }}
          onChange={(e) => handlePage(e)}
        />
      </Stack> */}
    </div>
  );
}

export default News;
