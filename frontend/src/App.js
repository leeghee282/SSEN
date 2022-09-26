import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/MainPage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import ProfileUpdate from "./pages/ProfileUpdatePage";
import Header from "./components/NavBar";
import Calculator from "./pages/CalculatorPage";
import Chart from "./components/Chart";
import Apitest from "./api/apitest";

function App() {
  return (
    <Router>
      <Routes>
        {/* Header 있는 페이지 */}
        <Route element={<Header />}>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileupdate" element={<ProfileUpdate />} />
        </Route>
        {/* Header 없는 페이지 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exchangecalc" element={<Calculator />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/test" element={<Apitest />} />
      </Routes>
    </Router>
  );
}

export default App;
