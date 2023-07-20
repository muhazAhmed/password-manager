import React from "react";
import "./About.css";

const About = () => {
  return (
    <>
      <div className="about-us-container" data-aos="zoom-out">
        <div className="about-us-header" data-aos="slide-down">
          <h1>About Us</h1>
        </div>
        <div className="about-us-content" data-aos="slide-up">
          <div className="feature-card">
            <i className="fas fa-lock"></i>
            <h2>Password Security</h2>
            <p>
              We prioritize the security of your passwords. Your data is
              encrypted and stored securely, ensuring your passwords are safe
              from unauthorized access.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-key"></i>
            <h2>Password Generator</h2>
            <p>
              Our advanced password generator allows you to create strong and
              unique passwords for your online accounts. Say goodbye to weak
              passwords forever!
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-user-friends"></i>
            <h2>User-Friendly Interface</h2>
            <p>
              Our user-friendly interface makes it easy for you to manage and
              organize your passwords. No technical expertise required!
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-globe"></i>
            <h2>Accessible Anywhere</h2>
            <p>
              Access your passwords from anywhere, on any device. Whether you're
              at home or on the go, your passwords are always within reach.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
