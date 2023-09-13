import React from 'react';
import './CSS/Navbar.css'; // Import your CSS file for navbar styling
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/">My Website</NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/">Sign Up</NavLink>
        </li>
      </ul>
    </nav>
  );
}
