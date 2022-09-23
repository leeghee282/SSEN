import React from "react";
import ReactWordcloud from "react-wordcloud";

const options = {
  rotations: 0,
  fontSizes: [20, 60], //기본 폰트 사이즈 //fontSizes를 쓰면 React does not recognize the `fontSizes` prop on a DOM element.가 뜹니다...왜?
  fontStyle: "normal",
  fontWeight: "normal",
};

// 임시 데이터
const words = [
  {
    text: "배지우 정말",
    value: 300,
  },
  {
    text: "S$EN",
    value: 200,
  },
  {
    text: "환율",
    value: 100,
  },
  {
    text: "힘내자!",
    value: 80,
  },
  {
    text: "뉴스",
    value: 70,
  },
  {
    text: "오잉",
    value: 60,
  },
  {
    text: "하이",
    value: 50,
  },
  {
    text: "바이",
    value: 40,
  },
];

const SimpleWordcloud = () => {
  return <ReactWordcloud options={options} words={words} fontSizes={"30px"} />;
};
export default SimpleWordcloud;
