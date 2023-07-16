import React, { useState, useContext } from 'react';
import "./Profile.css"
import { AuthContext } from '../../util/AuthContext';
import { usePutAPI } from "../../util/util.services";
import { ServerVariables } from '../../util/ServerVariables';

const Profile = () => {
  const { data, error, loading, updateData } = usePutAPI();
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    firstname: currentUser.User.firstname,
    lastname: currentUser.User.lastname,
    email: currentUser.User.email,
    phone: currentUser.User.phone,
    password: ''
  });

  const id = currentUser.User._id

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateData(ServerVariables.Update, id, inputs)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Profile</h1>
        <div className='profile-main'>
        <div className='sidebar'>
          <button>User Profile</button>
          <button>Delete Account</button>
        </div>
        <div className='profile-content'>
          <div>
            <input value={inputs.firstname} name='firstname' onChange={handleChange} autoComplete='off' />
            <input value={inputs.lastname} name='lastname' onChange={handleChange} autoComplete='off' />
          </div>
          <div>
            <input type='email' value={inputs.email} name='email' onChange={handleChange} autoComplete='off' />
            <input type='number' value={inputs.phone} name='phone' onChange={handleChange} autoComplete='off' />
          </div>
          <div className='profile-pass'><input type='password' name='password' onChange={handleChange} /></div>
          <div className='profile-btn'><button onClick={handleSubmit}>Update</button></div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
