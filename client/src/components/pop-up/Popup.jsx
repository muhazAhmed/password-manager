import React, { useState, useEffect, useRef } from "react";
import "./Popup.css";

const Popup = () => {
  const email = "muhaz@gmail.com";
  const codeInputs = useRef([]);
  const popupRef = useRef();

  useEffect(() => {
    if (codeInputs.current.length > 0) {
      codeInputs.current[0].focus();
    }
  }, []);

  const handleKeyDown = (e, idx) => {
    if (e.key >= 0 && e.key <= 9) {
      codeInputs.current[idx].value = "";
      setTimeout(() => {
        if (idx < codeInputs.current.length - 1) {
          codeInputs.current[idx + 1].focus();
        }
      }, 10);
    } else if (e.key === "Backspace") {
      setTimeout(() => {
        if (idx > 0) {
          codeInputs.current[idx - 1].focus();
        }
      }, 10);
    }
  };

  return (
    <div className="popup" ref={popupRef}>
      <div className="otp-header">
        <h1>Verify Your Account</h1>
      </div>
      <div className="otp-p">
        <p style={{ textAlign: "center" }}>
          We mailed you the four-digit code to <br />
          {email}
        </p>
      </div>
      <div className="otp-container">
        {[...Array(4)].map((_, idx) => (
          <input
            key={idx}
            ref={(el) => (codeInputs.current[idx] = el)}
            type="number"
            className="otp-code"
            placeholder="0"
            min="0"
            max="9"
            required
            onKeyDown={(e) => handleKeyDown(e, idx)}
          />
        ))}
      </div>
      <div className="otp-verify">
        <button>Verify</button>
      </div>
    </div>
  );
};

export default Popup;
