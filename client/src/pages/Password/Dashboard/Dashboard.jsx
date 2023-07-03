import React, { useState } from 'react';
import "./dashboard.css";
import Loading from '../../../components/Loading/Loading';

const Dashboard = () => {
  const data = "Testing";

  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);

  const handleClick = () => {
    setLoading(true); // Show the loading animation

    setTimeout(() => {
      setLoading(false); // After 5 seconds, hide the loading animation
      setShowData(true); // Show the data
    }, 3000);
  };

  return (
    <div>
      <button onClick={handleClick}>Fetch</button>
      {loading && <Loading />} {/* Show the loading animation if loading state is true */}
      {showData && <p>{data}</p>} {/* Show the data if showData state is true */}
    </div>
  );
};

export default Dashboard;
