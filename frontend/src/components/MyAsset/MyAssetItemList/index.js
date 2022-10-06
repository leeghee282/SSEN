// 보유 원화 목록으로 보여주기
import React, { useEffect, useState } from "react";

import axios from "../../../api/user";
import Filter from "../MyAssetFilter";
//mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Avatar from "@mui/material/Avatar";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function MyAssetItemList({
  myAsset,
  myAssetRemove,
  getMyAssetData,
  live,
  getLiveData,
  filterBaseCode,
  onChangeFilter,
  filteredItems,
}) {
  const chart = { USD: 0, JPY: 1, EUR: 2, GBP: 3, CNY: 4 };

  // 페이지네이션을 위한 것(mui)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const LabelDisplayedRows = ({ from, to, count }) => {
    return "";
  };

  // 보유 통화 삭제(delete)
  const deleteMyAsset = (event) => {
    try {
      axios.delete(`/api/v1/holdcurr/` + event).then((response) => {
        if (response.status === 200) {
          getMyAssetData();
        }
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const filterChangeHandler = (selectedCode) => {
    onChangeFilter(selectedCode);
  };

  const addComma = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Box>
      <Filter
        onChangeFilter={filterChangeHandler}
        filterBaseCode={filterBaseCode}
      />
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650, width: 1152 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#b2d4f1" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontSize: "20px" }}
                id="font_test"
              >
                국가
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "20px" }}
                id="font_test"
              >
                화폐
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "20px" }}
                id="font_test"
              >
                구매 양
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "20px" }}
                id="font_test"
              >
                구매 금액
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "20px" }}
                id="font_test"
              >
                현재 금액
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "20px" }}
                id="font_test"
              >
                총 구매가
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "20px" }}
                id="font_test"
              >
                삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredItems.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              : filteredItems
            ).map((asset) => (
              <TableRow
                key={asset.uid}
                myassetremove={myAssetRemove}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* 국가별 사진 */}
                {asset.code === "USD" && (
                  <TableCell align="center">
                    <img src="/images/USD.png" width={39} height={26}></img>
                  </TableCell>
                )}
                {asset.code === "EUR" && (
                  <TableCell align="center">
                    <img src="/images/EUR.png" width={39} height={26}></img>
                  </TableCell>
                )}
                {asset.code === "GBP" && (
                  <TableCell align="center">
                    <img src="/images/GBP.png" width={39} height={26}></img>
                  </TableCell>
                )}
                {asset.code === "CNY" && (
                  <TableCell align="center">
                    <img src="/images/CNY.png" width={39} height={26}></img>
                  </TableCell>
                )}
                {asset.code === "JPY" && (
                  <TableCell align="center">
                    <img src="/images/JPY.png" width={39} height={26}></img>
                  </TableCell>
                )}
                {/* 화폐 단위 */}
                <TableCell
                  align="center"
                  sx={{ fontSize: "15px" }}
                  id="font_test"
                >
                  {asset.code}
                </TableCell>
                {/* 국가별 구매양 단위 */}
                {asset.code === "USD" && (
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px" }}
                    id="font_test"
                  >
                    {addComma(asset.quantity.toString())}달러
                  </TableCell>
                )}
                {asset.code === "EUR" && (
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px" }}
                    id="font_test"
                  >
                    {addComma(asset.quantity.toString())}유로
                  </TableCell>
                )}
                {asset.code === "GBP" && (
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px" }}
                    id="font_test"
                  >
                    {addComma(asset.quantity.toString())}파운드
                  </TableCell>
                )}
                {asset.code === "CNY" && (
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px" }}
                    id="font_test"
                  >
                    {addComma(asset.quantity.toString())}위안
                  </TableCell>
                )}
                {asset.code === "JPY" && (
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px" }}
                    id="font_test"
                  >
                    {addComma(asset.quantity.toString())}엔
                  </TableCell>
                )}
                {/* 구매금액 */}
                <TableCell
                  align="center"
                  sx={{ fontSize: "15px" }}
                  id="font_test"
                >
                  {addComma(asset.price.toString())}원
                </TableCell>
                {/* 국가별 실시간 환율 */}
                <TableCell
                  align="center"
                  sx={{ fontSize: "15px" }}
                  id="font_test"
                >
                  {live.length === 5
                    ? addComma(
                      live[chart[asset.code]].buyPrice.toFixed(2).toString()
                    )
                    : "none"}
                  원
                </TableCell>
                {/* toFixed(2) => 소수점 2째자리까지 자르는 것(반올림 포함?) */}
                {/* 국가별 총 구매 금액 */}
                <TableCell
                  align="center"
                  sx={{ fontSize: "15px" }}
                  id="font_test"
                >
                  {addComma(asset.multi.toFixed(2).toString())}원
                </TableCell>
                {/* 삭제 버튼 */}
                <TableCell
                  align="center"
                  onClick={() => deleteMyAsset(asset.uid)}
                  style={{ cursor: "pointer" }}
                  sx={{ fontSize: "15px" }}
                  id="font_test"
                >
                  <DeleteForeverRoundedIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions=""
                colSpan={4}
                labelDisplayedRows={LabelDisplayedRows}
                count={filteredItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage=""
                showFirstButton="true"
                showLastButton="true"
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
