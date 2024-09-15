import React, { useState } from "react";
import { login } from "./Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showFields, setShowFields] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(email, password);
    navigate("/record");
    toast.success("Logged out successfully", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="relative flex items-center justify-end p-2">
      <button
        onClick={showFields ? handleLogin : () => setShowFields(!showFields)}
        className="bg-green-600 text-white rounded px-4 py-2 transition-all duration-500 absolute top-2 right-4 z-10"
      >
        Log In
      </button>

      <div
        className={`flex space-x-4 transform transition-transform duration-500 ease-in-out ${
          showFields
            ? "translate-x-[-125px] opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default Login;
