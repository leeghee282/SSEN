import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// import { Typography, Box, Link, Grid, Container, Avatar } from "@mui/material";

import { getPastData, getPastDatalist } from "../../_actions/past_action";
import Spinner from "../Loading/Spinner";

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
    navigate("/pastdetail", { state: { searchData: pastDatalist[key] } });
    // dispatch(getPastData()).then((response) => {
    //   console.log(response.payload);
    // });
  };

  return (
    <div>
      {pastLoading ? (
        <Spinner />
      ) : (
        <div>
          {searchList.map((search, index) => {
            return (
              <ul
                onClick={(event) => pastClickHandler(event, index)}
                style={{ cursor: "pointer" }}
                key={index}
              >
                <li>{search.date}</li>
                <li>{search.similarity}</li>
                <li>{search.currencyCode}</li>
                <li>{search.variance}</li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default PastSearch;
