import "./App.css";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div style={{ margin: "0px" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user && user._id ? (
                <Homepage currentUser={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/login"
            element={
              user && user._id ? (
                <Homepage currentUser={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/register"
            element={
              user && user._id ? (
                <Homepage currentUser={user} />
              ) : (
                <Register setLoginUser={setLoginUser} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
