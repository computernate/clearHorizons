import React, { useState } from 'react';
import axios from 'axios';

const LoginWithJobber = () => {
  const [loading, setLoading] = useState(false);

  const handleJobberConnect = async () => {
    try {
      setLoading(true);

      // Replace with your Jobber app details
      const clientId = '0227762b-357c-4b1f-a4b8-327ffd3d3aa3';
      const redirectUri = 'http://clearhorizonhome.com/authCallback';

      // Redirect user to Jobber OAuth authorization URL
      window.location.href = `https://api.getjobber.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    } catch (error) {
      console.error('Error connecting to Jobber:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleJobberConnect} disabled={loading}>
      {loading ? 'Connecting to Jobber...' : 'Connect to Jobber'}
    </button>
  );
};

export default LoginWithJobber;