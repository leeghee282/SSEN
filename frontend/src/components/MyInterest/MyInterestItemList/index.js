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
import { Avatar, Modal, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import MyInterestModal from "../MyInterestModal";

export default function MyInterestItemList({
  live,
  interests,
  getInterest,
  handleOpen,
}) {
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

  const chart = { USD: 0, JPY: 1, EUR: 2, GBP: 3, CNY: 4 };

  const detailNotice = (data) => {
    setDetails(data);
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

  const addComma = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Box>
      {interests.length === 0 && (
        <Avatar
          sx={{
            width: 600,
            height: 200,
            m: 1,
            bgcolor: "white",
            cursor: "pointer",
            borderRadius: "10px",
          }}
          onClick={handleOpen}
          variant="square"
          src="/images/Interest3.png"
        >
          {" "}
        </Avatar>
      )}
      {interests.length !== 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, width: 1152 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#c4c4c4" }}>
              <TableRow>
                {/* <TableCell id="font_test" >번호</TableCell> */}
                <TableCell
                  id="font_test"
                  align="center"
                  sx={{ fontSize: "20px" }}
                >
                  국가
                </TableCell>
                <TableCell
                  id="font_test"
                  align="center"
                  sx={{ fontSize: "20px" }}
                >
                  화폐
                </TableCell>
                <TableCell
                  id="font_test"
                  align="center"
                  sx={{ fontSize: "20px" }}
                >
                  목표금액 1
                </TableCell>
                <TableCell
                  id="font_test"
                  align="center"
                  sx={{ fontSize: "20px" }}
                >
                  목표금액 2
                </TableCell>
                <TableCell
                  id="font_test"
                  align="center"
                  sx={{ fontSize: "20px" }}
                >
                  목표금액 3
                </TableCell>
                <TableCell
                  id="font_test"
                  align="center"
                  sx={{ fontSize: "20px" }}
                >
                  현재 환율
                </TableCell>
                <TableCell
                  id="font_test"
                  align="center"
                  sx={{ fontSize: "20px" }}
                >
                  삭제
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interests.map((interest) => (
                <TableRow
                  key={interest.uid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* 국가별 사진 */}
                  {interest.code === "USD" && (
                    <TableCell align="center">
                      <img src="/images/USD.png" width={39} height={26}></img>
                    </TableCell>
                  )}
                  {interest.code === "EUR" && (
                    <TableCell align="center">
                      <img src="/images/EUR.png" width={39} height={26}></img>
                    </TableCell>
                  )}
                  {interest.code === "GBP" && (
                    <TableCell align="center">
                      <img src="/images/GBP.png" width={39} height={26}></img>
                    </TableCell>
                  )}
                  {interest.code === "CNY" && (
                    <TableCell align="center">
                      <img src="/images/CNY.png" width={39} height={26}></img>
                    </TableCell>
                  )}
                  {interest.code === "JPY" && (
                    <TableCell align="center">
                      <img src="/images/JPY.png" width={39} height={26}></img>
                    </TableCell>
                  )}
                  <TableCell
                    id="font_test"
                    align="center"
                    sx={{ fontSize: "15px" }}
                  >
                    {interest.code}
                  </TableCell>
                  <TableCell
                    id="font_test"
                    align="center"
                    sx={{ fontSize: "15px" }}
                  >
                    <Grid container>
                      <Grid item xs={10}>
                        {addComma(interest.target1.toFixed(2).toString())}원
                      </Grid>
                      <Grid
                        sx={{ pl: 0.5, cursor: "pointer" }}
                        item
                        xs={1}
                        onClick={() => {
                          const data = {
                            uid: interest.uid,
                            nation: interest.code,
                            target: interest.target1,
                          };
                          handleOpen2();
                          detailNotice(data);
                        }}
                      >
                        🖋
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    id="font_test"
                    align="center"
                    sx={{ fontSize: "15px" }}
                  >
                    <Grid container>
                      <Grid item xs={10}>
                        {addComma(interest.target2.toFixed(2).toString())}원
                      </Grid>
                      <Grid
                        sx={{ pl: 0.5, cursor: "pointer" }}
                        item
                        xs={1}
                        onClick={() => {
                          const data = {
                            uid: interest.uid,
                            nation: interest.code,
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
                  <TableCell
                    id="font_test"
                    align="center"
                    sx={{ fontSize: "15px" }}
                  >
                    <Grid container>
                      <Grid item xs={10}>
                        {addComma(interest.target3.toFixed(2).toString())}원
                      </Grid>
                      {/* 타겟2 값이 0이면 수정버튼 안뜸*/}
                      {interest.target2 !== 0 && (
                        <Grid
                          sx={{ pl: 0.5, cursor: "pointer" }}
                          item
                          xs={1}
                          onClick={() => {
                            const data = {
                              uid: interest.uid,
                              nation: interest.code,
                              target: interest.target3,
                            };
                            handleOpen2();
                            detailNotice(data);
                          }}
                        >
                          🖋
                        </Grid>
                      )}
                    </Grid>
                  </TableCell>
                  <TableCell
                    id="font_test"
                    align="center"
                    sx={{ fontSize: "15px" }}
                  >
                    {live.length === 5
                      ? addComma(
                          live[chart[interest.code]].buyPrice
                            .toFixed(2)
                            .toString()
                        )
                      : "none"}
                    원
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => deleteMyAsset(interest.uid)}
                    sx={{ cursor: "pointer", fontSize: "15px" }}
                  >
                    <DeleteForeverRoundedIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal open={open2} onClose={handleClose2}>
        <Box sx={style}>
          <MyInterestEdit
            details={details}
            handleClose2={handleClose2}
            getInterest={getInterest}
          />
        </Box>
      </Modal>
    </Box>
  );
}
