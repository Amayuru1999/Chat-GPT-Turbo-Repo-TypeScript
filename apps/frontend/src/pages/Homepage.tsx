import React from "react";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center flex-wrap">
      <div className="p-3 flex flex-col justify-center items-center">
        <h4 className="text-2xl font-bold mb-2">Text Generation</h4>
        <div
          onClick={() => navigate("/summary")}
          className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 border hover:border-primary-dark cursor-pointer"
        >
          <DescriptionRounded className="text-primary-main mt-2 ml-2 text-8xl" />
          <div className="p-3 pt-0 mt-2 flex flex-col items-center">
            <h5 className="font-bold text-lg">Text Summarizer</h5>
            <p className="text-md">
              Summarize long text into short sentences
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 flex flex-col justify-center items-center">
        <h4 className="text-2xl font-bold mb-2">Paragraph Generation</h4>
        <div
          onClick={() => navigate("/paragraph")}
          className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 border hover:border-primary-dark cursor-pointer"
        >
          <FormatAlignLeftOutlined className="text-primary-main mt-2 ml-2 text-8xl" />
          <div className="p-3 pt-0 mt-2 flex flex-col items-center">
            <h5 className="font-bold text-lg">Paragraph Generator</h5>
            <p className="text-md">
              Generate Paragraph with words
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 flex flex-col justify-center items-center">
        <h4 className="text-2xl font-bold mb-2">AI ChatBot</h4>
        <div
          onClick={() => navigate("/chatbot")}
          className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 border hover:border-primary-dark cursor-pointer"
        >
          <ChatRounded className="text-primary-main mt-2 ml-2 text-8xl" />
          <div className="p-3 pt-0 mt-2 flex flex-col items-center">
            <h5 className="font-bold text-lg">Chatbot</h5>
            <p className="text-md">
              Chat With AI Chatbot
            </p>
          </div>
        </div>
      </div>
      <div className="p-3 flex flex-col justify-center items-center">
  <h4 className="text-2xl font-bold mb-2">Javascript Converter</h4>
  <div
    onClick={() => navigate("/js-converter")}
    className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 border hover:border-primary-dark cursor-pointer"
  >
    <ChatRounded className="text-primary-main mt-2 ml-2 text-8xl" />
    <div className="p-3 pt-0 mt-2 flex flex-col items-center">
      <h5 className="font-bold text-lg">JS CONVERTER</h5>
      <p className="text-md">
        Translate English to JavaScript code
      </p>
    </div>
  </div>
</div>

<div className="p-3 flex flex-col justify-center items-center">
  <h4 className="text-2xl font-bold mb-2">AI SCIFI Images</h4>
  <div
    onClick={() => navigate("/scifi-image")}
    className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 border hover:border-primary-dark cursor-pointer"
  >
    <ChatRounded className="text-primary-main mt-2 ml-2 text-8xl" />
    <div className="p-3 pt-0 mt-2 flex flex-col items-center">
      <h5 className="font-bold text-lg">Scifi Image</h5>
      <p className="text-md">
        Generate Scifi images
      </p>
    </div>
  </div>
</div>


    </div>
  );
};

export default Homepage;
