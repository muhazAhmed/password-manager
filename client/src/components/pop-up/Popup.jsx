import React, { useState, useEffect, useRef } from "react";
import "./popup.css";
import { usePostAPI } from "../../util/util.services";
import { ServerVariables } from "../../util/ServerVariables";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";

const Popup = ({ userID, phone, setModel }) => {
  const { data, error, loading, postData } = usePostAPI();
  const [remainingTime, setRemainingTime] = useState(2 * 60);
  const codeInputs = useRef([]);
  const popupRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [inputs, setInputs] = useState({
    userID: userID,
    otp: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      postData(ServerVariables.VerifyOTP, inputs);
      setModel(false);
      setShowPopup(true); // Show the popup after registraion
      setTimeout(() => {
        setShowPopup(false); // Hide the popup after 3 seconds
      }, 3000);
    } catch (error) {
      setShowPopup(true); // Show the popup if error
      setTimeout(() => {
        setShowPopup(false); // Hide the popup after 3 seconds
      }, 3000);
    }
  };

  // ================ To Close the model =============
  const handlCancle = () => {
    setModel(false);
  };

  useEffect(() => {
    if (codeInputs.current.length > 0) {
      codeInputs.current[0].focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value.trim(),
      otp: codeInputs.current.map((input) => input.value.trim()).join(""),
    }));
  };

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

  useEffect(() => {
    if (codeInputs.current.length > 0) {
      codeInputs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer); // Clear the interval when remainingTime reaches 0
          setModel(false);
          return 0;
        }
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Convert remaining time to minutes and seconds
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <>
      {loading && <Loading />}
      {showPopup && <Message data={data || error} />}
      <div className="popup" ref={popupRef}>
        <div className="otp-header">
          <h1>Verify Your Account</h1>
        </div>
        <div className="otp-p">
          <p style={{ textAlign: "center" }}>
            We have sent you the four-digit code to <br />
            {"+"}
            {phone}
            <br />
            <br />
            Expires in{" "}
            <span
              style={{
                backgroundColor: "#fff",
                color: "var(--red)",
                fontSize: "18px",
              }}
            >
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
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
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            />
          ))}
        </div>
        <div className="otp-verify">
          <button onClick={handleSubmit}>Verify</button>
          <button id="cancle" onClick={handlCancle}>
            Cancle
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
