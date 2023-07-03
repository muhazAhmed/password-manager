import React from "react";
import "./pro.css";

const ProVersion = () => {
  return (
    <div className="subscription">
      <div className="first-line" data-aos="slide-up">
        <h1><span style={{color : "goldenrod"}}>Premium</span> Plans</h1>
      </div>
      <div className="sec-line">
        <h3>Choose the plan that's right for you.</h3>
      </div>
      <div className="outer-div">
        <div className="xtra-div" data-aos="slide-right">
          <div className="price-1">
            <h2>Free</h2>
            <h1>$ 0</h1>
            <h2>PER MONTH</h2>
          </div>
          <div className="plan-data">
            <h3>Password - 10/day</h3>
            <h3>Store Password - 99</h3>
            <h3>Beta Testing -❌</h3>
            <button>GET PLAN</button>
          </div>
        </div>
        <div className="xtra-div" data-aos="zoom-in">
          <div className="price-1">
            <h2>Basic</h2>
            <h1>$ 9</h1>
            <h2>PER MONTH</h2>
          </div>
          <div className="plan-data">
            <h3>Password - 100/day</h3>
            <h3>Store Password - 999</h3>
            <h3>Beta Testing -❌</h3>
            <button>GET PLAN</button>
          </div>
        </div>
        <div className="xtra-div" data-aos="slide-left">
          <div className="price-1">
            <h2>Premium</h2>
            <h1>$ 69</h1>
            <h2>PER MONTH</h2>
          </div>
          <div className="plan-data">
            <h3>Password - Unlimited</h3>
            <h3>Store Password - Unlimited</h3>
            <h3>Beta Testing -✅</h3>
            <button>GET PLAN</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProVersion;
