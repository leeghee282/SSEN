import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseNewsURL } from "../../api/index";

const Search = () => {
  const [search, setSearch] = useState(""); //검색어
  const [lists, setLists] = useState([]); //검색한 리스트 저장할 곳

  //값 받기

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(search, 124123);
    e.preventDefault();

    await axios
      .get(baseNewsURL + `/api/v1/search/${search}`)
      .then((response) => console.log(response));
  };

  return (
    <>
      <form>
        <input
          type="text"
          onChange={handleChange}
          placeholder="검색어를 입력해주세요"
        />
        <button onClick={handleSubmit}></button>
      </form>
    </>
  );
};

export default Search;
