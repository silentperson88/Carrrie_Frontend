import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./register.css";
const Register = ({ setLoginUser }) => {
  const [user, setUser] = useState({
    name: "",
    userName: "",
    password: "",
  });

  const [name, setName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  //register function
  const handle_register = (e) => {
    e.preventDefault();
    user.name = name;
    user.userName = username;
    user.password = password;
    if (user.name && user.userName && user.password) {
      axios
        .post("http://localhost:9000/usersManagement/Register", user)
        .then((res) => {
          console.log(res.data.message);
          console.log(res);
          setLoginUser(res.data.user);
        });
    } else {
      alert("invalid input");
    }
  };
  return (
    <>
      <form>
        <div className="r-form-field">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="r-form-field">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </div>

        <div className="r-form-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />{" "}
        </div>

        <div className="r-form-field">
          <button
            className="btn"
            type="submit"
            onClick={(e) => handle_register(e)}
          >
            Register
          </button>
        </div>
      </form>
      <div className="register">
        <Link to="/login" className="register">
          Allready a member? <span className="register_tag">Login now</span>
        </Link>
      </div>
    </>
  );
};
export default Register;
