// 보유 원화 목록으로 보여주기
import React, { useEffect, useState } from "react";

import axios from "../../../api/user";
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

const buyPriceList = [];

export default function MyAssetItemList({
  myAsset,
  myAssetRemove,
  getMyAssetData,
  live,
  getLiveData,
}) {
  console.log(myAsset);
  console.log(live);
  // Object.assign(live, live);
  // const newObj = { ...live, ...myAsset };
  // console.log(myAsset, 11);
  // console.log(live, 22);
  // console.log(newObj);

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

  return (
    <Box>
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
            {myAsset.map((asset) => (
              <TableRow
                key={asset.uid}
                myassetremove={myAssetRemove}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{asset.code}</TableCell>
                <TableCell align="center">
                  {asset.quantity}
                  {/* <EditOutlinedIcon fontSize="small" /> */}
                </TableCell>
                <TableCell align="center">{asset.price}</TableCell>
                {asset.code === "USD" && (
                  <TableCell align="center">바이</TableCell>
                )}
                {asset.code !== "USD" && (
                  <TableCell align="center">하이</TableCell>
                )}
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
