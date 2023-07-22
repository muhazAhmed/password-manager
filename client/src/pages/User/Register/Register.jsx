import React, { useState } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ServerVariables } from "../../../util/ServerVariables";
import wallapaer from "../../../assets/images/form.svg";
import Loading from "../../../components/Loading/Loading";
import Popup from "../../../components/pop-up/Popup";
import { usePostAPI } from "../../../util/util.services";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Message from "../../../components/Message/Message";

const Register = () => {
  const { data, error, loading, postData } = usePostAPI();
  const [showPopup, setShowPopup] = useState(false);
  const [country, setCountry] = useState("IN"); // To store the selected country code
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [model, setModel] = useState(false); // Added state for popup model

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Construct the full phone number with the country code before sending it to the server
      const fullPhoneNumber = `${country} ${inputs.phone}`;
      setInputs((prev) => ({ ...prev, phone: fullPhoneNumber }));

      postData(ServerVariables.Register, inputs);
      setModel(true);
      setTimeout(() => {
        setShowPopup(false); // Hide the popup after 3 seconds
      }, 3000);
    } catch (error) {
      setShowPopup(true); // Show the popup after successful deletion
      setTimeout(() => {
        setShowPopup(false); // Hide the popup after 3 seconds
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Check if all input fields are filled
  const isFormValid = () => {
    const { firstname, lastname, email, phone, password } = inputs;
    return (
      firstname.trim() !== "" &&
      lastname.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      password.trim() !== ""
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* {!error && data && model && (
        <Popup userID={data.data._id} phone={data.data.phone} setModel={setModel}/>
      )} */}
      {showPopup && <Message data={data.message} />}
      <div className="form">
        <div className="wallpaper" data-aos="zoom-out">
          <img src={wallapaer} alt="wallapaper" />
        </div>
        <div className="xtra-div" data-aos="zoom-in">
          <div className="form-right">
            <form>
              <h1>Register</h1>
              <div className="form-row">
                <input
                  className="text-input"
                  placeholder="Enter first name"
                  name="firstname"
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <input
                  className="text-input"
                  placeholder="Enter last name"
                  name="lastname"
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <input
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  onChange={handleChange}
                />
                {/* Use PhoneInput component for phone number input */}
                <PhoneInput
                  country={country}
                  value={inputs.phone}
                  name="phone"
                  onChange={(value, country) => {
                    setCountry(country ? country.countryCode : "IN");
                    setInputs((prev) => ({ ...prev, phone: value }));
                  }}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-row">
                <input
                  className={classnames("password-input", {
                    "show-password": showPassword,
                  })}
                  placeholder="Enter password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                />
                <i
                  className={classnames("fa", {
                    "fa-eye": !showPassword,
                    "fa-eye-slash": showPassword,
                  })}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              <button onClick={handleSubmit} disabled={!isFormValid()}>
                Sign-Up
              </button>
              <p className="form-footer">
                Already have an account?{" "}
                <Link to="/user/login" style={{ textDecoration: "none" }}>
                  <span>Login</span>
                </Link>
              </p>
              {error && <p className="error">{error}</p>}
              {loading && <Loading />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
