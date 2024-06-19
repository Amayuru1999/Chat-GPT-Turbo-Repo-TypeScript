import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/v1/auth/login", { email, password });
      toast.success("Logged in Successfully");
      localStorage.setItem("authToken", JSON.stringify(true));
      navigate("/");
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="w-full md:w-2/5 lg:w-2/3 mx-auto p-8 md:p-12 bg-white rounded shadow">
      <Collapse in={error !== ''}>
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" className="mb-4">
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          className="mb-4"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          className="mb-4"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          className="bg-blue-500 text-white"
        >
          Login
        </Button>
        <Typography className="mt-4">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </form>
    </div>
  );
};

export default Login;
