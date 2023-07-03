import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../util/AuthContext";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav data-aos="slide-down">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <Link to="/" style={{ textDecoration: "none" }}>
          <li>Home</li>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <li>About</li>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <li>Contact Us</li>
        </Link>
        <div className="gen">
          <Link
            to="/user/pass-generate"
            title="generate passowrd"
            style={{ textDecoration: "none" }}
          >
            <h5>Generator</h5>
          </Link>
        </div>
        <Link to="/buy/subscription" style={{ textDecoration: "none" }}>
          <li style={{ color: "goldenrod" }}>Pro+</li>
        </Link>
      </ul>
      <div className="user-info">
        <Link
          to="/user/profile/:id/:userName"
          style={{ textDecoration: "none" }}
        >
          <span title="profile">{currentUser?.User.firstname}</span>
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
