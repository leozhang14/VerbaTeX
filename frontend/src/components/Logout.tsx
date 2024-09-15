import React from 'react';
import { logout } from './Auth';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout(navigate);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative flex items-center justify-end p-2">
        <button 
            onClick={handleLogout}
            className="bg-green-600 text-white rounded px-4 py-2 transition-all duration-500 inline-flex items-center"
        >
            Log Out
        </button>
    </div>
  );
};

export default Logout;

