import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPastData } from "../../_actions/past_action";

function PastSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pastDatalist = useSelector((state) => state.pastReducer.pastDatalist);

  const pastClickHandler = async (event) => {
    await dispatch(getPastData(event.target.data)).then((response) => {
      console.log(response.payload);
    });
    navigate("/pastdetail");
  };

  return (
    <div>
      {pastDatalist.map((data) => (
        <li onClick={pastClickHandler}>
          <p>{data.date}</p>
          <p>{data.value}</p>
          <p>{data.currencyCode}</p>
          <p>{data.variance}</p>
        </li>
      ))}
    </div>
  );
}

export default PastSearch;
