import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/MainPage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import ProfileUpdate from "./pages/ProfileUpdatePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profileupdate" element={<ProfileUpdate/>} />
      </Routes>
    </Router>
  );
}

export default App;
