import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPastCurrData } from "../../_actions/past_action";

function PastSearch() {
  const dispatch = useDispatch();

  const pastData = useSelector((state) => state.pastReducer.pastData);
  const pastCurrData = useSelector((state) => state.pastReducer.pastCurrData);

  useEffect(() => {
    dispatch(getPastCurrData(pastData.currencyCode)).then((response) => {
      console.log(response.payload);
    });
  }, []);

  return (
    <div>
      <div>{pastData}</div>
      <div>{pastCurrData}</div>
    </div>
  );
}

export default PastSearch;
