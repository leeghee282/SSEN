import React from 'react';
import './Paging2.css';
import Pagination from 'react-js-pagination';

function Paging({
  totalCount,
  postPerPage,
  postRangeDisplayed,
  handlePageChange,
  page,
}) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postPerPage}
      totalItemsCount={totalCount ? totalCount : 0}
      pageRangeDisplayed={postRangeDisplayed}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
}

export default Paging;
