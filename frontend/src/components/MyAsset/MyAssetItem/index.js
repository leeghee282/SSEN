// 보유 원화 한개씩
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MyAssetItem({ repo, onRemove }) {
  const { id, currency_code, quantity, price } = repo;

  return (
    <Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">국가</TableCell>
            <TableCell align="right">양</TableCell>
            <TableCell align="right">금액</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {id}
              </TableCell>
              <TableCell align="right">{currency_code}</TableCell>
              <TableCell align="right">{quantity}</TableCell>
              <TableCell align="right">{price}</TableCell>
              <TableCell align="right" onClick={() => onRemove(id)}>삭제</TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </Box>

    
  );
}
