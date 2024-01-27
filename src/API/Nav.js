import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm p-2 mb-4 fixed-top my-nav">
      <div className="container-fluid">
        <div
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src="logo.png" alt="logo" width={"48px"} className="me-2" />{" "}
          <span>Voice Guru</span>
        </div>
        <Link to="/about" className="nav-link">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
