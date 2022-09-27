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
};

  return (
    <Box>
      <Filter
        onChangeFilter={filterChangeHandler}
        filterBaseCode={filterBaseCode}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">국가</TableCell>
              <TableCell align="center">구매 양</TableCell>
              <TableCell align="center">구매 금액</TableCell>
              <TableCell align="center">현재 금액</TableCell>
              <TableCell align="center">구매가</TableCell>
              <TableCell align="center">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((asset) => (
              <TableRow
                key={asset.uid}
                myassetremove={myAssetRemove}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{asset.code}</TableCell>
                <TableCell align="center">
                  {asset.quantity}
                </TableCell>
                <TableCell align="center">{asset.price}</TableCell>
                <TableCell align="center">
                  {live.length === 5
                    ? live[chart[asset.code]].buyPrice
                    : "none"}
                </TableCell>
                <TableCell align="center">{asset.multi}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => deleteMyAsset(asset.uid)}
                  style={{ cursor: "pointer" }}
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
