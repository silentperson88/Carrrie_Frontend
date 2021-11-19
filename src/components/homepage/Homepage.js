import React from "react";
import Todos from "./Todo/Todos";
import "./homepage.css";

const Homepage = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div className="home_Container">
      <div className="title">
        <h1>Welcome to Homepage {currentUser.name}</h1>
      </div>
      <Todos />
    </div>
  );
};
export default Homepage;
