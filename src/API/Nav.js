import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
        {location.pathname === "/" && !loginUser && (
          <div className="d-flex">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        )}
        {loginUser && (
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px", border: "1px solid var(--blue)" }}
          >
            {loginUser}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
