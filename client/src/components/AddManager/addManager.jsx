import React, { useContext, useState } from "react";
import "../updateManager/updatemanager.css";
import { usePostAPI } from "../../util/util.services";
import { ServerVariables } from "../../util/ServerVariables";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../util/AuthContext";
import Message from "../Message/Message";

const AddManager = ({ handleDataRefetch, setAddModel }) => {
  const { currentUser } = useContext(AuthContext);
  const id = currentUser.User._id;
  const [inputs, setInputs] = useState({
    userId: id,
    siteName: "",
    userName: "",
    password: "",
    siteLink: "",
  });
  const { data, error, loading, postData, setError } = usePostAPI();
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postData(ServerVariables.AddPassword.replace(":id", id), inputs);
    setShowPopup(true); // Show the popup after successful adding password
    setAddModel(false);
    handleDataRefetch(); // Trigger data refetch in the Dashboard component
  };

  // ================ To Close the model =============
  const handlCancle = () => {
    setAddModel(false);
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
            <h2>Add Password</h2>
          </div>
          <div className="up-data">
            <input
              name="siteName"
              placeholder="Site Name"
              autoComplete="off"
              onChange={handleChange}
            />
            <input
              name="userName"
              placeholder="User Name"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="up-data">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              onChange={handleChange}
            />
            <input
              name="siteLink"
              placeholder="Site URL"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="up-btn">
            <button onClick={handleSubmit}>Add</button>
            <button id="cancle" onClick={handlCancle}>
              Cancle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddManager;
