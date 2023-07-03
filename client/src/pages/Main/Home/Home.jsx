import React, { useContext } from "react";
import "./Home.css";
import wallpaperSVG from "../../../assets/images/home.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../util/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div className="home">
      <div className="wallpaper" data-aos="zoom-in"><img src={wallpaperSVG} alt="wallpaper" /></div>
        <div className="left-cont" data-aos="slide-up">
        <div><h1>Welcome to Password <span style={{color:"#fff"}}>Manager</span></h1></div>
        <div><p>One place to manage all your passwords</p></div>
        <div>{currentUser ? (
        <Link
          to="/user/dashboard"
          style={{ textDecoration: "none" }}
        >
          <button>Dashboard</button>
        </Link>
      ) : (
        <Link className="link" to="/user/login">
          <button>Login</button>
        </Link>
      )}</div>
        </div>
      </div>
      <div className="footer"><p><span>®</span>2023, Muhaz Ahmed, All right reserved</p></div>
    </>
  );
};

export default Home;
