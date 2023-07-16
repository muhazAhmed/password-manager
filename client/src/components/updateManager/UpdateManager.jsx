import React, { useState, useEffect } from "react";
import "./updatemanager.css";
import { usePutAPI } from "../../util/util.services";
import { ServerVariables } from "../../util/ServerVariables";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";

const UpdateManager = ({ selectedItem, handleDataRefetch, setUpdateModel }) => {
  const [inputs, setInputs] = useState({
    siteName: "",
    userName: "",
    password: "",
    siteLink: "",
  });
  const { data, error, loading, updateData, setError } = usePutAPI();
  const { siteName, userName, password, siteLink } = inputs;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setInputs({
        siteName: selectedItem.siteName,
        userName: selectedItem.userName,
        password: selectedItem.decryptedPassword,
        siteLink: selectedItem.siteLink,
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateData(
      ServerVariables.updatePassword.replace(":id", selectedItem.id),
      inputs
    );

    setShowPopup(true); // Show the popup after successful updation
    setUpdateModel(false);
    handleDataRefetch(); // Trigger data refetch in the Dashboard component
  };

  // ================ To Close the model =============
  const handlCancle = () => {
    setUpdateModel(false);
    setError(null);
  };

  return (
    <>
      {showPopup && data && <Message data={data || error} />}
      {loading && <Loading />}
      {error && <p>{error}</p>}
      <div className="update-passowrd">
        <div className="up-body">
          <div>
            <h2>Update Password</h2>
          </div>
          <div className="up-data">
            <input
              name="siteName"
              value={siteName}
              placeholder="Site Name"
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              name="userName"
              value={userName}
              placeholder="User Name"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="up-data">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              autoComplete="off"
              onChange={handleChange}
            />
            <input
              name="siteLink"
              value={siteLink}
              placeholder="Site URL"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="up-btn">
            <button onClick={handleUpdate}>Update</button>
            <button id="cancel" onClick={handlCancle}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateManager;
