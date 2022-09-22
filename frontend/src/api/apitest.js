import axios from "axios";

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

  return (
    <div>
      <button onClick={getchat}>ddd</button>
      <button onClick={getcurr}>ddd</button>
    </div>
  );
}

export default Apitest;
