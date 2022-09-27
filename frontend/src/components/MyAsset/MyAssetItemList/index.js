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
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";


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
  }

  const addComma = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <Box>
      <Filter
        onChangeFilter={filterChangeHandler}
        filterBaseCode={filterBaseCode}
      />
      <TableContainer component={Paper} sx={{mt:2}}>
        <Table sx={{ minWidth: 650, width:900 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#c4c4c4"}}>
            <TableRow >
              <TableCell align="right" sx={{ fontSize: "20px" }} id="font_test">국가</TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }} id="font_test">구매 양</TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }} id="font_test">구매 금액</TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }} id="font_test">현재 금액</TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }} id="font_test">총 구매가</TableCell>
              <TableCell align="center" sx={{ fontSize: "20px" }} id="font_test">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((asset) => (
              <TableRow
                key={asset.uid}
                myassetremove={myAssetRemove}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* 국가 이름 */}
                <TableCell align="right" sx={{ fontSize: "15px" }} id="font_test">{asset.code}</TableCell>
                {/* 국가별 구매양 단위 */}
                {asset.code === 'USD' &&
                  <TableCell align="right" sx={{ fontSize: "15px" }} id="font_test">
                  {addComma(asset.quantity.toString())}달러
                </TableCell>}
                {asset.code === 'EUR' &&
                  <TableCell align="right" sx={{ fontSize: "15px" }} id="font_test">
                  {addComma(asset.quantity.toString())}유로
                </TableCell>}
                {asset.code === 'GBP' &&
                  <TableCell align="right" sx={{ fontSize: "15px" }} id="font_test">
                  {addComma(asset.quantity.toString())}파운드
                </TableCell>}
                {asset.code === 'CNY' &&
                  <TableCell align="right" sx={{ fontSize: "15px" }} id="font_test">
                  {addComma(asset.quantity.toString())}위안
                </TableCell>}
                {asset.code === 'JPY' &&
                  <TableCell align="right" sx={{ fontSize: "15px" }} id="font_test">
                  {addComma(asset.quantity.toString())}엔
                </TableCell>}
                {/* 구매금액 */}
                <TableCell align="right" sx={{ fontSize: "15px" }} id="font_test">{addComma(asset.price.toString())}원</TableCell>
                {/* 국가별 실시간 환율 */}
                <TableCell align="right" sx={{ fontSize: "15px" }} id="font_test">
                  {live.length === 5
                    ? addComma(live[chart[asset.code]].buyPrice.toFixed(2).toString())
                    : "none"}원
                </TableCell>
                {/* toFixed(2) => 소수점 2째자리까지 자르는 것(반올림 포함?) */}
                {/* 국가별 총 구매 금액 */}
                <TableCell align="right" sx={{ fontSize: "15px" }} id="font_test">{addComma(asset.multi.toString())}원</TableCell>
                {/* 삭제 버튼 */}
                <TableCell
                  align="center"
                  onClick={() => deleteMyAsset(asset.uid)}
                  style={{ cursor: "pointer" }}
                  sx={{ fontSize: "15px" }} id="font_test"
                >
                  <DeleteForeverRoundedIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
