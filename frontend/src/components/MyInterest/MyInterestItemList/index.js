// 관심 화폐 목록으로 보여주기
import React from "react";
// mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export default function MyInterestItemList({ interests, onRemove }) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nation</TableCell>
              <TableCell align="center">Target 1</TableCell>
              <TableCell align="center">Target 2</TableCell>
              <TableCell align="center">Target 3</TableCell>
              <TableCell align="center">현재 환율</TableCell>
              <TableCell align="center">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interests.map((interest) => (
              <TableRow
                key={interest.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {interest.id}
                </TableCell>
                <TableCell align="center">{interest.nation}</TableCell>
                <TableCell align="center">
                  {interest.interestCurrency}
                </TableCell>
                <TableCell align="center">
                  {interest.interestCurrency}
                </TableCell>
                <TableCell align="center">수정</TableCell>
                <TableCell align="center">현재 환율 어케 가져와욥?</TableCell>
                {/* <TableCell align="center">UPDATE</TableCell> */}
                <TableCell
                  align="center"
                  onClick={() => onRemove(interest.id)}
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
