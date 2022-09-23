// 관심 화폐 목록으로 보여주기
import React from "react";
import axios from "../../../api/user";
import { baseURL } from "../../../api";
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
import MyInterestEdit from "../MyInterestEdit";
import { useState } from "react";
import { Modal, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function MyInterestItemList({ interests, getInterest }) {
  // 수정 모달 오픈관리
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [details, setDetails] = useState("");
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const detailNotice = (data) => {
    setDetails(data);
    console.log(details);
  };

  // 보유 통화 삭제(delete)
  const deleteMyAsset = (event) => {
    try {
      axios.delete(baseURL + `/api/v1/intrcurr/` + event).then((response) => {
        if (response.status === 200) {
          getInterest();
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
              <TableCell>uid</TableCell>
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
                key={interest.uid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {interest.uid}
                </TableCell>
                <TableCell align="center">{interest.code}</TableCell>
                <TableCell align="center">
                  <Grid container>
                    <Grid item xs={10}>
                      {interest.target1}
                    </Grid>
                    <Grid
                      sx={{ pl: 0.5, cursor: "pointer" }}
                      item
                      xs={1}
                      onClick={() => {
                        const data = {
                          nation: interest.nation,
                          target: interest.target,
                        };
                        handleOpen2();
                        detailNotice(data);
                      }}
                    >
                      🖋
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  <Grid container>
                    <Grid item xs={10}>
                      {interest.target2}
                    </Grid>
                    <Grid
                      sx={{ pl: 0.5, cursor: "pointer" }}
                      item
                      xs={1}
                      onClick={() => {
                        const data = {
                          nation: interest.nation,
                          target: interest.target2,
                        };
                        handleOpen2();
                        detailNotice(data);
                      }}
                    >
                      🖋
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  <Grid container>
                    <Grid item xs={10}>
                      {interest.target3}
                    </Grid>
                    <Grid
                      sx={{ pl: 0.5, cursor: "pointer" }}
                      item
                      xs={1}
                      onClick={() => {
                        const data = {
                          nation: interest.nation,
                          target: interest.target3,
                        };
                        handleOpen2();
                        detailNotice(data);
                      }}
                    >
                      🖋
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">현재 환율 어케 가져와욥?</TableCell>
                {/* <TableCell align="center">UPDATE</TableCell> */}
                <TableCell
                  align="center"
                  onClick={() => deleteMyAsset(interest.uid)}
                  sx={{ cursor: "pointer" }}
                >
                  <DeleteForeverRoundedIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open2} onClose={handleClose2}>
        <Box sx={style}>
          <MyInterestEdit details={details} handleClose2={handleClose2} />
        </Box>
      </Modal>
    </Box>
  );
}
