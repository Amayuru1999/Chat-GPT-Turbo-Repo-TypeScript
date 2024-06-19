import React from "react";
import { Box, Typography, useTheme, Theme } from "@mui/material";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const theme: Theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8081/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      width="100%"
      className="p-4 text-center"
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: 3,
        mb: 2,
      }}
    >
      <Typography variant="h1" color="primary" fontWeight="medium">
        <Link to="/">AI GPT3 Clone</Link>
      </Typography>
      {loggedIn ? (
        <>
          <NavLink to="/" className="p-4 mr-4 text-primary-dark"> {/* Added text-primary-dark for color */}
            Home
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} className="p-4">
            Logout
          </NavLink>
        </>

      ) : (
        <>
          <NavLink to="/" className="p-4">
            Home
          </NavLink>
          <NavLink to="/register" className="p-4">
            Register
          </NavLink>
          <NavLink to="/login" className="p-4">
            Login
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
