// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { baseNewsURL } from "../../api/index";

// const Search = () => {
//   const [search, setSearch] = useState(""); //검색어
//   const [lists, setLists] = useState([]); //검색한 리스트 저장할 곳

//   //값 받기

//   const handleChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     console.log(search, 124123);
//     e.preventDefault();

//     await axios
//       .get(baseNewsURL + `/api/v1/search/${search}`)
//       .then((response) => console.log(response));
//   };

//   return (
//     <>
//       <form>
//         <input
//           type="text"
//           onChange={handleChange}
//           placeholder="검색어를 입력해주세요"
//         />
//         <button onClick={handleSubmit}></button>
//       </form>
//     </>
//   );
// };

// export default Search;
import axios from "axios";
import { baseNewsURL } from "../../api/index";
import { useState, useEffect } from "react";
import Pagination from "./SearchPagination";
import './style.css'
import { Typography,Box } from "@mui/material";


function Search() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [search, setSearch] = useState(""); //검색어
  const [lists, setLists] = useState([]); //검색한 리스트 저장할 곳
  
    //값 받기
  
    const handleChange = (e) => {
      setSearch(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      console.log(search, 124123);
      e.preventDefault();
  
      try{await axios
        .get(baseNewsURL + `/api/v1/search/${search}`)
        .then((response) => setLists(response));}
        catch(e) {
          console.log(e)
        }
    };
  

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((data) => {
        
        
  //       setPosts(data)
  //     });
  // }, []);

  return (
    <div>
       <form>
        <input
          type="text"
          onChange={handleChange}
          placeholder="검색어를 입력해주세요"
        />
        <button onClick={handleSubmit}></button>
      </form>
      <header>
        <h1>게시물 목록</h1>
      </header>
      

      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>

      <main>
        {lists.slice(offset, offset + limit).map(({ id, title, body }) => (
          
          <Box className="card" key={id}>
            <Typography fontSize="30px" sx={{height:"60px"}}> 
              {title.length >=40 ? title.substr(0,40)+"..." : title
          }
            </Typography >
            <Typography >{body.length >=50 ? body.substr(0,50)+"..." : body
          }</Typography>
          </Box>
        ))}
      </main>

      <footer>
        <Pagination
          total={lists.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
      </div>
  );
}



export default Search;

