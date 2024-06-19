import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { TextField, Button, Alert, Typography } from "@mui/material";

const ChatBot: React.FC = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const loggedIn: boolean = !!localStorage.getItem("authToken");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<{ text: string }>("http://localhost:8081/api/v1/openai/run", { prompt });
      setResponse(data.text);
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
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
        <div className="p-10 flex justify-center align-content-start">
          <h3>
            Please
            <Link to="/login">Log In</Link>
            to Continue
          </h3>
        </div>
      ) : (
        <div className="w-full md:w-2/5 lg:w-2/3 mx-auto p-8 md:p-12 bg-white rounded shadow">
          <div className="mb-4">
            <form onSubmit={handleSubmit}>
              <h3 className="text-2xl font-bold">Ask with Chatbot</h3>
              <TextField
                placeholder="Add your text"
                type="text"
                multiline={true}
                required
                fullWidth
                className="mt-4"
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPrompt(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className="bg-blue-500 text-white mt-4"
              >
                Chat
              </Button>
            </form>
          </div>
          <div className="mb-4">
            {error !== '' && (
              <Alert severity="error">{error}</Alert>
            )}
          </div>
          <div>
            {response ? (
              <div className="border border-gray-300 rounded p-4 h-80 overflow-y-auto">
                {response}
              </div>
            ) : (
              <div className="border border-gray-300 rounded p-4 h-80 flex justify-center items-center text-gray-500">
                Bot's Response (Please wait for few secs after submitting...)
              </div>
            )}
          </div>
          <div className="mt-4">
            <Typography>
              Not this tool ? <Link to="/">GO BACK</Link>
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
