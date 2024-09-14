import React from 'react';
import { logout } from './Auth';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
