import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Contract App</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Upload</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/view-active">View Active</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/fill">Fill Contract</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/versions">Versions</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/personalized">Personalized</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
