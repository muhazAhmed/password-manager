import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { AuthContext } from "../../util/AuthContext";
import { useFetchAPI, usePutAPI } from "../../util/util.services";
import { ServerVariables } from "../../util/ServerVariables";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";

const Profile = () => {
  const { data, fetchData } = useFetchAPI();
  const { Data, error, loading, updateData } = usePutAPI();
  const { currentUser } = useContext(AuthContext);
  const [deleteSection, setDeleteSection] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [inputs, setInputs] = useState({
    userId: currentUser.User._id,
    siteName: "",
    userName: "",
    password: "",
    siteLink: "",
  });

  // ============ To fetch data ===============
  useEffect(() => {
    fetchData(ServerVariables.FetchUser.replace(":id", currentUser.User._id));
  }, [currentUser.User._id]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(true); // Show the popup after successful updation

    updateData(
      ServerVariables.Update.replace(":id", currentUser.User._id),
      inputs
    );
  };

  const toggleDelete = () => {
    setDeleteSection(true);
  };

  const toggleProfile = () => {
    setDeleteSection(false);
  };

  return (
    <>
      {showPopup && data && <Message data={Data || error} />}
      {loading && <Loading />}
      {error && <p>{error}</p>}
      <div className="profile" data-aos="zoom-in">
        <div className="profile-cont">
          <div className="profile-header">
            <h1>Profile</h1>
          </div>
          <div className="profile-body">
            <div className="profile-left">
              <button onClick={toggleProfile}>User Profile</button>
              <button id="profile-btn-2" onClick={toggleDelete}>
                Delete Account
              </button>
            </div>
            {deleteSection === false ? (
              <div className="profile-right">
                <div className="profile-input">
                  <input
                    value={currentUser.User.firstname || ""}
                    name="firstname"
                    onChange={handleChange}
                    placeholder="First Name"
                    autoComplete="off"
                  />
                  <input
                    value={currentUser.User.lastname || ""}
                    name="lastname"
                    onChange={handleChange}
                    placeholder="last Name"
                    autoComplete="off"
                  />
                </div>
                <div className="profile-input">
                  <input
                    value={currentUser.User.email || ""}
                    name="email"
                    onChange={handleChange}
                    placeholder="email"
                    type="email"
                    autoComplete="off"
                  />
                  <input
                    value={currentUser.User.phone || ""}
                    name="phone"
                    onChange={handleChange}
                    placeholder="Phone"
                    type="number"
                    autoComplete="off"
                  />
                </div>
                <div className="profile-input">
                  <input
                    name="firstname"
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                    autoComplete="off"
                  />
                </div>
                <div className="profile-btns">
                  <button onClick={handleSubmit}>Update</button>
                  <Link to="/user/dashboard" style={{ backgroundColor: "#fff" }}>
                    <button id="cancle">Cancle</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="dlete-section">
                <div className="delete-sec-body">
                  <p>
                    By clicking the below <span>Delete</span> button,
                    <br /> all your data will be deleted and cannot be obtained
                    back.
                  </p>
                  <p>Are you sure?</p>
                </div>
                <div className="dlt-btn">
                  <button>Delete</button>
                  <button id="cancle" onClick={toggleProfile}>
                    Cancle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
