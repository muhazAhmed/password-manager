import React, { useState } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ServerVariables } from "../../../util/ServerVariables";
import wallapaer from "../../../assets/images/form.svg";
import Loading from "../../../components/Loading/Loading";
import Popup from "../../../components/pop-up/Popup";
import {usePostAPI} from "../../../util/util.services"

const Register = () => {
  const { data, error, loading, postData } = usePostAPI();
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    code : "",
    verified : "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [model, setModel] = useState(false); // Added state for popup model

  const handleSubmit= (e) => {
    e.preventDefault();

    postData(ServerVariables.Register, inputs)
    setModel(true);
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
              <input
                placeholder="Enter phone number"
                name="phone"
                type="number"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                className={classnames("password-input", {
                  "show-password": showPassword
                })}
                placeholder="Enter password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
              />
              <i
                className={classnames("fa", {
                  "fas-eye": !showPassword,
                  "fas-eye-slash": showPassword
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
    {model && <Popup/>}
    </>
  );
};

export default Register;
