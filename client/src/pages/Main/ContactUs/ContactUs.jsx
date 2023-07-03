import React from "react";
import "./Contact.css";
import wallpaper from "../../../assets/images/wallpaper.svg";

const ContactUs = () => {
  return (
    <div className="contact">
      <img src={wallpaper} alt="wallpaper" data-aos="fade"/>
      <div className="conact-body" data-aos="slide-down">
        <h1>
          We love to hear from you,
          <br />
          Get in touch👋
        </h1>
      </div>
      <div className="message" data-aos="zoom-in">
        <form>
        <div className="main-div">
          <div className="cont-row-1">
            <input placeholder="Enter your name" />
            <select name="regarding">
              <option defaultValue>Select the topic</option>
              <option>Password Generator</option>
              <option>Password Manager</option>
              <option>Other</option>
            </select>
          </div>
          <div className="cont-row-2">
            <input placeholder="Enter your email address" type="email" />
            <textarea placeholder="Type your message here" />

          </div>
            <button>Send</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
