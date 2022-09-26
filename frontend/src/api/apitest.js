import axios from "axios";
// import baseURL from "./index";

// const axios = Axios.create({
//   baseURL: baseURL,
// });

// const code = "USD";

// // URL에 ?가 있는 경우
// function getchat() {
//   const chatData = axios
//     .get("/api/v1/chat", { params: { currencyCode: code } })
//     .then((res) => res.data);

//   console.log(chatData);
// }

// // URL에 {}가 있는 경우
// const userId = "kk";

// // function getcurr() {
// //   const currData = axios
// //     .get(`/api/v1/intrcurr/${userId}`)
// //     .then((res) => res.data);

// //   console.log(currData);
// // }

function Apitest() {
  const getchat = () => {
    const ans = axios
      .get("http://localhost:8080/api/v1/chat", {
        params: { currencyCode: "USD" },
      })
      .then((res) => res.data);

    console.log(ans);
  };

  const getcurr = () => {
    const ans = axios
      .get("http://localhost:8080/api/v1/curr/period/2022-09-01/2022-09-08/USD")
      .then((res) => res.data);

    console.log(ans);
  };

  const getnews = () => {
    const ans = axios
      .get("https://j7e204.p.ssafy.io/news/keyword/2022-09-01/2022-09-05")
      .then((res) => res.data);

    console.log(ans);
  };

  return (
    <div>
      <button onClick={getchat}>ddd</button>
      <button onClick={getcurr}>ddd</button>
      <button onClick={getnews}>ddd</button>
    </div>
  );
}

export default Apitest;
