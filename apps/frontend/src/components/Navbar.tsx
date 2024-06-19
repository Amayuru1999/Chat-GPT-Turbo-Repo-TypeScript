import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8081/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      window.location.href = "/login"; // Redirect without using navigate()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-gray-100 shadow-md mb-2 p-4 text-center">
      <h1 className="text-xl font-medium text-primary">
        <Link to="/">AI GPT3 Clone</Link>
      </h1>
      {loggedIn ? (
        <>
          <Link to="/" className="p-4 text-primary-dark"> {/* Added text-primary-dark for color */}
            Home
          </Link>
          <button onClick={handleLogout} className="p-4 text-primary-dark">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/" className="p-4">
            Home
          </Link>
          <Link to="/register" className="p-4">
            Register
          </Link>
          <Link to="/login" className="p-4">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
