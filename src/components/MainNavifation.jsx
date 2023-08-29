import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("tk");
    return navigate("/auth");
  };

  return (
    <nav id="nav" className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid ">
        <NavLink className="navbar-brand" to="home">
          Noxe
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav m-auto ">
            <li className="nav-item">
              <NavLink className="nav-link " to="home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="movies">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="tv">
                Tvshows
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="people">
                People
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="network">
                Networks
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-0">
            <li onClick={logOutHandler} className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="#">
                Logout
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default MainNavigation;
