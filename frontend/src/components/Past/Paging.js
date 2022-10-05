import React from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

function Paging({
  totalCount,
  postPerPage,
  postRangeDisplayed,
  handlePageChange,
  page,
  loading,
}) {
  if (loading) {
    return <div></div>;
  }
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postPerPage}
      totalItemsCount={totalCount ? totalCount : 0}
      pageRangeDisplayed={postRangeDisplayed}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
      lastPageText={">>"}
    />
  );
}

export default Paging;
