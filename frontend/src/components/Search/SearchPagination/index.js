
// import { Box, Button } from "@mui/material";

// function Pagination({ total, limit, page, setPage }) {
//   const numPages = Math.ceil(total / limit);

//   return (
//     <Box sx={{}}>
//       <Button sx={{}}onClick={() => setPage(page - 1)} disabled={page === 1}>
//         &lt;
//       </Button>
//       {Array(numPages)
//         .fill()
//         .map((_, i) => (
//           <Button sx={{background:"#B8B9BD",width:"30px",height:"30px",color:"black",fontWeight:700,"&:hover": {
//             background: "#DEE0E4",
//           },}}
//             key={i + 1}
//             onClick={() => setPage(i + 1)}
//             aria-current={page === i + 1 ? "page" : null}
//           >
//             {i + 1}
//           </Button>
//         ))}
//       <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
//         &gt;
//       </Button>
//     </Box>
//   );
// }

// export default Pagination;
