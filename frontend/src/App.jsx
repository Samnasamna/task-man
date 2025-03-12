import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;