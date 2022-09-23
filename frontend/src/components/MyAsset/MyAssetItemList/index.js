// 보유 원화 목록으로 보여주기
import React, { useEffect, useState } from "react";
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

export default function MyAssetItemList({ myAsset, onRemove }) {
  // console.log(myAsset);
  // const multi =
  //   parseInt(myAsset[0].quantity) *
  //   parseInt(myAsset[0].price.replaceAll(",", ""));
  // console.log(multi);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nation</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">UPDATE</TableCell>
              <TableCell align="center">곱하기</TableCell>
              <TableCell align="center">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myAsset.map((asset) => (
              <TableRow
                key={asset.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {asset.id}
                </TableCell>
                <TableCell align="center">{asset.currency_code}</TableCell>
                <TableCell align="center">{asset.quantity}</TableCell>
                <TableCell align="center">{asset.price}</TableCell>
                <TableCell align="center">수정 아직 안되욥... ㅠ</TableCell>
                <TableCell align="center">
                  백에서 보내주는 데이터 받을게요오
                </TableCell>
                <TableCell
                  align="center"
                  onClick={() => onRemove(asset.id)}
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
