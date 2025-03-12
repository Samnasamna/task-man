import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { BrowserRouter as Router, Routes, Route,  Navigate } from "react-router-dom"

function App() {

  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to={"/dashboard"} /> : <Navigate to={"/login"} />} />
        <Route path="/dashboard" exxact element={token ? <Home/> : <Navigate to={"/login"}/>}/>
        <Route path="/login" exxact element={<Login/>}/>
        <Route path="/signup" exxact element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App
