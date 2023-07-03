import React, { useState } from "react";
import "./generator.css";
import { ToggleSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";

const PasswordGenerator = () => {
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  return ( 
    <div className="pass-body">
    <div><h1>Password Generator</h1></div>
    <div className="out-pass">
        <h1></h1>
    </div>
      <div className="slider">
        <span className="min">4</span><input id="slider" type="range" min="4" max="32" /><span className="max">24</span>
      </div>
      <div className="toggle-buttons">
        <label>
          <span>Include Uppercase</span>
          <ToggleSwitch
            checked={upper}
            onChange={(e) => {
              setUpper(e);
            }}
          />
        </label>
        <label>
          <span>Include Lowercase</span>
          <ToggleSwitch
            checked={lower}
            onChange={(e) => {
              setLower(e);
            }}
          />
        </label>
        <label>
          <span>Include Number</span>
          <ToggleSwitch
            checked={number}
            onChange={(e) => {
              setNumber(e);
            }}
          />
        </label>
        <label>
          <span>Include Symbol</span>
          <ToggleSwitch
            checked={symbol}
            onChange={(e) => {
              setSymbol(e);
            }}
          />
        </label>
      </div>
      <div className="gen-btn">
        <button>Generate Password</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
