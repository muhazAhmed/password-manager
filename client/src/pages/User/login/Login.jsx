import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import wallapaer from "../../../assets/images/form.svg";
import { AuthContext } from "../../../util/AuthContext";
import Loading from "../../../components/Loading/Loading";
import Message from "../../../components/Message/Message";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // Added state for redirecting
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setRedirecting(true); // Start redirecting/loading animation
      await login(inputs);
      navigate("/user/dashboard");
    } catch (error) {
      setShowPopup(true); // Show the popup after successful deletion
      setTimeout(() => {
        setShowPopup(false); // Hide the popup after 3 seconds
      }, 3000);
      setError(error.response.data);
      setRedirecting(false); // Stop redirecting/loading animation in case of an error
    }
  };

  // Check if all input fields are filled
  const isFormValid = () => {
    const { email, password } = inputs;
    return email.trim() !== "" && password.trim() !== "";
  };

  // =========== To toggele password show icon ========
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {showPopup && <Message data={error} />}
      <div className="form">
        <div className="wallpaper" data-aos="zoom-in">
          <img src={wallapaer} alt="wallapaper" />
        </div>
        {redirecting && <Loading />}
        <div className="xtra-div" data-aos="zoom-out">
          <div className="login-right">
            <form>
              <h1>Login</h1>
              <input
                placeholder="Enter email"
                name="email"
                type="email"
                autoComplete="off"
                onChange={handleChange}
              />
              <div className="form-row">
                <input
                  className={classnames("password-input", {
                    "show-password": showPassword,
                  })}
                  placeholder="Enter password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <i
                  className={classnames("fas", {
                    "fas-eye": !showPassword,
                    "fas-eye-slash": showPassword,
                  })}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              <Link to="/user/dashboard">
                <button onClick={handleSubmit} disabled={!isFormValid()}>
                  Login
                </button>
              </Link>
              <p className="form-footer">
                New account ?{" "}
                <Link to="/user/register" style={{ textDecoration: "none" }}>
                  <span>Register</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
