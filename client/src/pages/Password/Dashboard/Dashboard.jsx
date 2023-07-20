import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import { useDeleteAPI, useFetchAPI } from "../../../util/util.services";
import { ServerVariables } from "../../../util/ServerVariables";
import { AuthContext } from "../../../util/AuthContext";
import Loading from "../../../components/Loading/Loading";
import Message from "../../../components/Message/Message";
import UpdateManager from "../../../components/updateManager/UpdateManager";
import AddManager from "../../../components/AddManager/addManager";

const Dashboard = () => {
  const { data, error, loading, fetchData } = useFetchAPI();
  const { Data, deleteData } = useDeleteAPI();
  const { currentUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [updateModel, setUpdateModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addModel, setAddModel] = useState(false);

  const id = currentUser.User._id;

  // ============ To fetch data ===============
  useEffect(() => {
    const url = ServerVariables.FetchPassword.replace(":id", id);
    fetchData(url);
  }, [id]);

  // ============== To Delete Data ===============
  const handleDelete = async (ID) => {
    await deleteData(ServerVariables.DeletePassword.replace(":id", ID));
    setShowPopup(true); // Show the popup after successful deletion

    // Fetch the updated data after deletion
    const url = ServerVariables.FetchPassword.replace(":id", id);
    fetchData(url);

    setTimeout(() => {
      setShowPopup(false); // Hide the popup after 3 seconds
    }, 3000);
  };

  // ============= To open the update model =============
  const openUpdateModel = (item) => {
    setSelectedItem(item);
    setUpdateModel(true);
  };

  // ============= To open the addPassword model =============
  const openAddModel = () => {
    setAddModel(true);
  };

  // =========== To toggle password show icon ========
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDataRefetch = () => {
    const url = ServerVariables.FetchPassword.replace(":id", id);
    fetchData(url);
  };

  // ================= Copy to Clipboard code =============
  const handleCopyPassword = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  return (
    <>
      {showPopup && <Message data={Data || error} />}
      {updateModel && (
        <UpdateManager
          selectedItem={selectedItem}
          setUpdateModel={setUpdateModel}
          handleDataRefetch={handleDataRefetch}
        />
      )}
      {addModel && (
        <AddManager
          setAddModel={setAddModel}
          handleDataRefetch={handleDataRefetch}
        />
      )}
      {loading && <Loading />}
      {error && <h2>{error}</h2>}
      <div className="dashboard">
        <div className="dash-main" data-aos="slide-down">
          <div className="dash-header">
            <h1>Password Manager</h1>
          </div>
          <div className="add-pass">
            <button onClick={openAddModel}>Add New Password</button>
          </div>
        </div>
        <div className="card-container-wrapper" data-aos="slide-up">
          {data &&
            data.map((item, index) => (
              <div className="card-container" key={index}>
                <div className="card-header">
                  <h2>{item.siteName}</h2>
                </div>
                <div className="card-body">
                  <div>
                    <p>User Name: {item.userName}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <p>Site URL: </p>
                    <div>
                      <input
                        className={classNames("password-input", {
                          "show-password": showPassword,
                        })}
                        name="password"
                        value={item.decryptedPassword}
                        readOnly
                        type={showPassword ? "text" : "password"}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                      <i
                        className={classNames("fas", {
                          "fas-eye": !showPassword,
                          "fas-eye-slash": showPassword,
                        })}
                        onClick={togglePasswordVisibility}
                      ></i>
                      <i
                        title="Copy to clipboard"
                        className="fas fa-clipboard"
                        onClick={() =>
                          handleCopyPassword(item.decryptedPassword)
                        }
                      ></i>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <p>Site URL:</p>
                    <a href={item.siteLink}>{item.siteLink}</a>
                  </div>

                  <div>
                    <p>Created at: {item.date}</p>
                  </div>
                  <div className="card-btns">
                    <div>
                      <i
                        className="fa-solid fa-pen-to-square"
                        title="edit"
                        onClick={() => openUpdateModel(item)}
                      ></i>
                    </div>
                    <div>
                      <i
                        className="fa-solid fa-trash"
                        title="delete"
                        onClick={() => handleDelete(item.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
