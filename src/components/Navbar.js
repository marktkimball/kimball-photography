import React from "react";
import { Link } from "gatsby";
import Logo from "../img/logo.png";
import "./navbar.scss";

const Navbar = () => (
  <nav className="menu-container">
    <input type="checkbox" aria-label="Toggle menu" />
    <span></span>
    <span></span>
    <span></span>
    <Link to="/" className="menu-logo" title="Kimball Photography">
      <img alt="Kimball Photography Logo" src={Logo} />
    </Link>

    <div className="menu">
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li className="nav-item-cta-container">
          <Link className="nav-item-cta" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
