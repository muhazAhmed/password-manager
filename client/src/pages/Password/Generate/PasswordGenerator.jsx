import React, { useState } from "react";
import "./generator.css";
import { ToggleSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import usePostAPI from "../../../util/util.services";
import { ServerVariables } from "../../../util/ServerVariables";

const PasswordGenerator = () => {
  const { data, error, loading, postData } = usePostAPI();
  const [length, setLength] = useState(4);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = {
      length : length,
      upperCase: upperCase,
      lowerCase: lowerCase,
      numbers: numbers,
      specialChar: specialChar
    };

    await postData(ServerVariables.Generate, inputs);
  };

  return ( 
    <div className="pass-body">
    <div><h1>Password Generator</h1></div>
    <div className="out-pass">
        <h1></h1>
    </div>
      <div className="slider">
        <span className="min">4</span><input id="slider" name="length" type="range" min="4" max="24"value={length}
          onChange={(e) => setLength(parseInt(e.target.value))} /><span className="max">24</span> <p>Password Lenght : {length}</p>
      </div>
      <div className="toggle-buttons">
        <label>
          <span>Include UpperCase Case</span>
          <ToggleSwitch
            checked={upperCase}
            onChange={(e) => {
              setUpperCase(e);
            }}
          />
        </label>
        <label>
          <span>Include LowerCase Case</span>
          <ToggleSwitch
            checked={lowerCase}
            onChange={(e) => {
              setLowerCase(e);
            }}
          />
        </label>
        <label>
          <span>Include Number</span>
          <ToggleSwitch
            checked={numbers}
            onChange={(e) => {
              setNumbers(e);
            }}
          />
        </label>
        <label>
          <span>Include Special Charecters</span>
          <ToggleSwitch
            checked={specialChar}
            onChange={(e) => {
              setSpecialChar(e);
            }}
          />
        </label>
      </div>
      <div className="gen-btn">
        <button onClick={handleSubmit}>Generate Password</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
