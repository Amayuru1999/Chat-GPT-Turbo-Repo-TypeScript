import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ScifiImage: React.FC = () => {
  const navigate = useNavigate();

  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/v1/openai/scifi-image",
        { text }
      );
      setImage(data);
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
            <h3 className="mb-4 text-2xl font-bold">Scifi Image</h3>
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
              Submit
            </button>
            <p className="mt-4">
              Not this tool? <Link to="/">GO BACK</Link>
            </p>
          </form>

          {image ? (
            <div className="mt-4 border border-gray-300 shadow rounded">
              <img src={image} alt="scifiimage" className="w-full" />
            </div>
          ) : (
            <div className="mt-4 border border-gray-300 shadow rounded flex items-center justify-center h-80">
              <h5 className="text-center">
                Scifi Image Will Appear Here (Please wait for few secs after submitting...)
              </h5>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ScifiImage;
