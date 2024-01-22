import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginUser = useSelector((state) => state.authentication.authUser);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-2 mb-4 fixed-top">
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
