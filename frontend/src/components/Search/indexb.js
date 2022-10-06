// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./style.css";
// import { baseNewsURL } from "../../api/index";
// import Pagination from "./SearchPagination";
// import { Typography, Box, Link, Grid, Container, Avatar } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import Loading from "../Loading";

// function Search() {
//   const [limit, setLimit] = useState(5);
//   const [page, setPage] = useState(1);
//   const offset = (page - 1) * limit;
//   const [noneDataFlag, setNoneDataFlag] = useState(false); // 데이터가 있는지 없는지 확인하는 곳
//   const [search, setSearch] = useState(""); //검색어
//   const [lists, setLists] = useState([
//     // {
//     //   title: "제목은 어쩌구저쩌구",
//     //   content:
//     //     "내용은 어쩌구저쩌구sssssssssssㄴㅇㄻㄴㅇㄻㅈㄷㄱㅈㄷㄱㅈㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅈㄷㄱㅈㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅈㄷㄱㄴㅇㄹㄴㅇㄹㄴㅇㅈㄷㄱㅈㄹㄴㄹㄴssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdㄴㅇㄻㅇㄴㄹㅈㄷㄱㅈㄷㄱㅈㄷㄴㅇㄹㄴㅇㅁㄻㄴㅇㄹㄴㄹㄴㅁㄻㄴㅇss",
//     //   time: "2022-09-01",
//     //   url: "www.naver.com",
//     //   press: "한국일보",
//     // },
//     // {
//     //   title: "제목은 어쩌구저쩌구",
//     //   content: "내용은 어쩌구저쩌구",
//     //   time: "2022-09-01",
//     //   url: "www.naver.com",
//     //   press: "한국일보",
//     // },
//   ]); //검색한 리스트 저장할 곳
//   const [loading, setLoading] = useState(true);

//   const location = useLocation();

//   const data = [
//     "한국",
//     "미국",
//     "중국",
//     "일본",
//     "경제",
//     "뉴스",
//     "국민",
//     "뉴욕",
//     "코로나",
//   ];
//   const pick = Math.floor(Math.random() * data.length);

//   useEffect(() => {
//     async function fetchData() {
//       console.log(location.state, "확인용");
//       setLoading(true);
//       try {
//         const result = await axios.get(
//           baseNewsURL + `/news/search/${location.state.search}`
//         );

//         setLists(result.data);
//         setNoneDataFlag(false);
//         setLoading(false);
//       } catch (e) {
//         setNoneDataFlag(true);
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [location]);

//   // 추천검색어 눌렀을때 하려했으나 안됨
//   // const clickRC = async () => {
//   //   setLoading(true);
//   //   console.log(data[pick],1111)
//   //   try{
//   //   const result = await axios.get(
//   //     baseNewsURL +
//   //       `/news/search/${location.state.search}/${data[pick]}/${location.state.endDate}/`
//   //   );
//   //   setLists(result.data);
//   //       setNoneDataFlag(false);
//   //       setLoading(false);
//   //   }
//   //   catch(e) {
//   //     setNoneDataFlag(true);
//   //       setLoading(false);
//   //   }
//   // };

//   return (
//     <div>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div>
//           {noneDataFlag && (
//             <Box>
//               <Avatar
//                 src="images/nosearch.png"
//                 variant="square"
//                 sx={{
//                   ml: 30,
//                   width: "50%",
//                   height: "30%",
//                 }}
//               ></Avatar>
//               <Typography>추천 검색어 : {data[pick]}</Typography>
//             </Box>
//           )}
//           {!noneDataFlag && (
//             <div>
//               <Typography
//                 sx={{
//                   mt: 4,
//                   mb: 3,
//                   display: "flex",
//                   justifyContent: "center",
//                   fontSize: "35px",
//                   fontWeight: 600,
//                 }}
//               >
//                 {location.state.search} 검색 결과
//               </Typography>

//               <Typography sx={{ ml: 3 }} id="font_test">
//                 페이지 당 표시할 게시물 수 : &nbsp;
//                 <select
//                   id="font_test"
//                   type="number"
//                   value={limit}
//                   onChange={({ target: { value } }) => setLimit(Number(value))}
//                 >
//                   <option value="5">5</option>
//                   <option value="12">12</option>
//                   <option value="20">20</option>
//                   <option value="50">50</option>
//                   <option value="100">100</option>
//                 </select>
//               </Typography>

//               <main>
//                 {lists
//                   .slice(offset, offset + limit)
//                   .map(({ title, content, time, url, press }, index) => (
//                     <Grid key={index} container>
//                       <Grid item xs={12}>
//                         <Link
//                           href={url}
//                           target="_blank"
//                           sx={{ textDecoration: "none", color: "black" }}
//                         >
//                           <Box
//                             sx={{
//                               pt: 2,
//                               "&:hover": {
//                                 background: "#DEE0E4",
//                               },
//                             }}
//                             className="card"
//                           >
//                             <Grid
//                               sx={{ borderBottom: "1px dashed black" }}
//                               container
//                             >
//                               <Grid item xs={10}>
//                                 <Typography
//                                   id="font_test"
//                                   fontSize="30px"
//                                   sx={{ ml: 1, height: "60px" }}
//                                 >
//                                   {title.length >= 1
//                                     ? title.replaceAll("…", " ").substr(0, 30) +
//                                       "..."
//                                     : title}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={2}>
//                                 <Grid container direction="column">
//                                   <Grid id="font_test" item xs={2}>
//                                     {press}
//                                   </Grid>
//                                   <Grid
//                                     id="font_test"
//                                     sx={{ mt: 1 }}
//                                     item
//                                     xs={10}
//                                   >
//                                     {time.replaceAll("\u0000", "")}
//                                   </Grid>
//                                 </Grid>
//                               </Grid>
//                             </Grid>

//                             <Grid sx={{ pl: 1 }} item xs={11.5}>
//                               <Typography sx={{ pt: 3 }} id="font_Gmarket">
//                                 {content.length >= 170
//                                   ? content.substr(0, 170) + "..."
//                                   : content}
//                               </Typography>
//                             </Grid>
//                           </Box>
//                         </Link>
//                       </Grid>
//                     </Grid>
//                   ))}
//               </main>
//               <br></br>
//               <br></br>
//               <br></br>

//               <footer>
//                 <Pagination
//                   total={lists.length}
//                   limit={limit}
//                   page={page}
//                   setPage={setPage}
//                 />
//               </footer>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Search;
