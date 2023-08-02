import React from "react";
import { Link } from "react-router-dom";
import "./404.css"
import svg from "../../assets/images/404.svg";

const PageNotFound = () => {
  return (
    <>
      <div className="error-page" data-aos="zoom-in">
        <img src={svg} alt="svg" />
        <Link className="btn-primery">
          <button onClick={() => history.go(-1)}>Go Back</button>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
