import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainCalendar from "./pages/MainPage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import ProfileUpdate from "./pages/ProfileUpdatePage";
import Header from "./components/NavBar";
import Calculator from "./pages/CalculatorPage";
import Chart from "./components/Chart";
import Apitest from "./api/apitest";

// test 위한 것
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <Routes>
        {/* Header 있는 페이지 */}
        <Route element={<Header />}>
          <Route path="/" element={<MainCalendar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileupdate" element={<ProfileUpdate />} />
          <Route path="/search" element={<Search />} />
        </Route>
        {/* Header 없는 페이지 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exchangecalc" element={<Calculator />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/apitest" element={<Apitest />} />
      </Routes>
    </Router>
  );
}

export default App;
