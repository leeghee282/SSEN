// 보유 원화 목록으로 보여주기
import React, { useEffect, useState } from "react";

import axios from "../../../api/user";
import { baseURL } from "../../../api";
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function MyAssetItemList({
  myAsset,
  myAssetRemove,
  getMyAssetData,
}) {
  console.log(myAsset);

  const deleteMyAsset = (event) => {
    try {
      axios.delete(baseURL + `/api/v1/holdcurr/` + event).then((response) => {
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
              <TableCell align="center">uid</TableCell>
              <TableCell align="center">Nation</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              {/* <TableCell align="center">UPDATE</TableCell> */}
              <TableCell align="center">Multi</TableCell>
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
                <TableCell component="th" scope="row">
                  {asset.uid}
                </TableCell>
                <TableCell align="center">{asset.code}</TableCell>
                <TableCell align="center">
                  {asset.quantity}
                  {/* <EditOutlinedIcon fontSize="small" /> */}
                </TableCell>
                <TableCell align="center">{asset.price}</TableCell>
                {/* <TableCell align="center">수정 아직 안되욥... ㅠ</TableCell> */}
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
