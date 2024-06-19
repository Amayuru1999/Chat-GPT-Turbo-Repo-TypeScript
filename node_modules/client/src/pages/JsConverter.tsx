import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const JsConverter: React.FC = () => {
  const navigate = useNavigate();

  const [text, setText] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8081/api/v1/openai/js-converter", {
        text,
      });
      setCode(data);
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
    <>
      {!loggedIn ? (
        <div className="p-10 flex justify-center items-start">
          <Typography variant="h3">
            Please <Link to="/login">Log In</Link> to Continue
          </Typography>
        </div>
      ) : (
        <div className="w-full md:w-2/5 lg:w-2/3 mx-auto p-8 md:p-12 bg-white rounded shadow">
          <Collapse in={error !== ""}>
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          </Collapse>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3" className="mb-4">
              JS Converter
            </Typography>
            <TextField
              placeholder="Add your text"
              type="text"
              multiline
              required
              fullWidth
              className="mb-4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="bg-blue-500 text-white"
            >
              Convert
            </Button>
            <Typography className="mt-4">
              Not this tool? <Link to="/">GO BACK</Link>
            </Typography>
          </form>
          <div className="mt-4">
            {code ? (
              <Card className="border border-gray-300 rounded p-4 h-80 overflow-auto">
                <pre>{code}</pre>
              </Card>
            ) : (
              <Card className="border border-gray-300 rounded p-4 h-80 flex justify-center items-center text-gray-500">
                Your Code Will Appear Here (Please wait for a few secs after submitting...)
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JsConverter;
