import React, { useState, useRef } from "react";
import axios from "axios";
import "./login.css";
import Register from "../register/Register";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const Login = ({ setLoginUser }) => {
  //   const history = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const login = (e) => {
    e.preventDefault();
    user.userName = username;
    user.password = password;
    axios
      .post("http://localhost:9000/usersManagement/Login", user)
      .then((res) => {
        // alert(res.data.message);
        console.log(res.data.message);
        setLoginUser(res.data.user);
        //   history.push("/");
      });
  };

  return (
    <>
      <form>
        <div className="l-form-field">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </div>

        <div className="l-form-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />{" "}
        </div>

        <div className="l-form-field">
          <button className="btn" type="submit" onClick={(e) => login(e)}>
            Log in
          </button>
        </div>
      </form>
      <div className="register">
        <Link to="/register" className="register">
          Not a member? <span className="register_tag">Register now</span>
        </Link>
      </div>
    </>
  );
};
export default Login;
