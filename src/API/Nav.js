import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm p-2 fixed-top my-nav">
      <div className="container-fluid">
        <div
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src="logo.png" alt="logo" width={"40px"} className="me-1" />{" "}
          <span>Voice Guru</span>
        </div>
        <div className="nav nav-items">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
