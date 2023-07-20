import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../util/AuthContext";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav data-aos="slide-down">
      <div className="logo">
        <Link to="/" onClick={handleLinkClick}>
          <img title="Home" src={logo} alt="logo" />
        </Link>
      </div>

      <div
        className={`menu-icon ${isMenuOpen ? "open" : ""}`}
        onClick={handleMenuToggle}
      >
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>

      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={handleLinkClick}
        >
          <li>Home</li>
        </Link>
        <Link
          to="/about"
          style={{ textDecoration: "none" }}
          onClick={handleLinkClick}
        >
          <li>About</li>
        </Link>
        <Link
          to="/contact"
          style={{ textDecoration: "none" }}
          onClick={handleLinkClick}
        >
          <li>Contact Us</li>
        </Link>
        <div className="gen">
          <Link
            to="/user/pass-generate"
            title="generate passowrd"
            style={{ textDecoration: "none" }}
            onClick={handleLinkClick}
          >
            <h5>Generator</h5>
          </Link>
        </div>
        <Link
          to="/buy/subscription"
          style={{ textDecoration: "none" }}
          onClick={handleLinkClick}
        >
          <li style={{ color: "goldenrod" }}>Pro+</li>
        </Link>
      </ul>

      <div className="user-info">
        {currentUser && (
          <span title="Online">
            <i
              className="fas fa-circle fa-fade"
              style={{ color: "#1dc228", fontSize: "10px" }}
            ></i>
          </span>
        )}
        <Link
          to="/user/profile/:id/:userName"
          style={{ textDecoration: "none" }}
          onClick={handleLinkClick}
        >
          <span title="Profile">{currentUser?.User.firstname}</span>
        </Link>

        {currentUser ? (
          <Link to="/user/login" style={{ textDecoration: "none" }}>
            <button onClick={logout}>Logout</button>
          </Link>
        ) : (
          <Link className="link" to="/user/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
