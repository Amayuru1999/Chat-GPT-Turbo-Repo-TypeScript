import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
          <h3>
            Please <Link to="/login">Log In</Link> to Continue
          </h3>
        </div>
      ) : (
        <div className="w-full md:w-2/5 lg:w-2/3 mx-auto p-8 md:p-12 bg-white rounded shadow">
          {error !== "" && (
            <div className="mb-4 text-red-500">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4 text-2xl font-bold">JS Converter</h3>
            <textarea
              placeholder="Add your text"
              className="mb-4 w-full p-2 border border-gray-300 rounded"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Convert
            </button>
            <p className="mt-4">
              Not this tool? <Link to="/">GO BACK</Link>
            </p>
          </form>
          <div className="mt-4">
            {code ? (
              <div className="border border-gray-300 rounded p-4 h-80 overflow-auto">
                <pre>{code}</pre>
              </div>
            ) : (
              <div className="border border-gray-300 rounded p-4 h-80 flex justify-center items-center text-gray-500">
                Your Code Will Appear Here (Please wait for a few secs after submitting...)
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JsConverter;
