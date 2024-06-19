import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center flex-wrap">
      <div className="p-3 flex flex-col justify-center items-center">
        <Typography variant="h4" mb={2} fontWeight="bold">
          Text Generation
        </Typography>
        <Card
          onClick={() => navigate("/summary")}
          className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 hover:border-2 hover:shadow-none hover:border-primary-dark cursor-pointer"
        >
          <DescriptionRounded className="text-primary-main mt-2 ml-2 text-8xl" />
          <Stack p={3} pt={0} mt={2} className="flex flex-col items-center">
            <Typography fontWeight="bold" variant="h5">
              Text Summarizer
            </Typography>
            <Typography variant="h6">
              Summarize long text into short sentences
            </Typography>
          </Stack>
        </Card>
      </div>
      <div className="p-3 flex flex-col justify-center items-center">
        <Typography variant="h4" mb={2} fontWeight="bold">
          Paragraph Generation
        </Typography>
        <Card
          onClick={() => navigate("/paragraph")}
          className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 hover:border-2 hover:shadow-none hover:border-primary-dark cursor-pointer"
        >
          <FormatAlignLeftOutlined className="text-primary-main mt-2 ml-2 text-8xl" />
          <Stack p={3} pt={0} mt={2} className="flex flex-col items-center">
            <Typography fontWeight="bold" variant="h5">
              Paragraph Generator
            </Typography>
            <Typography variant="h6">
              Generate Paragraph with words
            </Typography>
          </Stack>
        </Card>
      </div>
      <div className="p-3 flex flex-col justify-center items-center">
        <Typography variant="h4" mb={2} fontWeight="bold">
          AI ChatBot
        </Typography>
        <Card
          onClick={() => navigate("/chatbot")}
          className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 hover:border-2 hover:shadow-none hover:border-primary-dark cursor-pointer"
        >
          <ChatRounded className="text-primary-main mt-2 ml-2 text-8xl" />
          <Stack p={3} pt={0} mt={2} className="flex flex-col items-center">
            <Typography fontWeight="bold" variant="h5">
              Chatbot
            </Typography>
            <Typography variant="h6">Chat With AI Chatbot</Typography>
          </Stack>
        </Card>
      </div>
      <div className="p-3 flex flex-col justify-center items-center">
        <Typography variant="h4" mb={2} fontWeight="bold">
          Javascript Converter
        </Typography>
        <Card
          onClick={() => navigate("/js-converter")}
          className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 hover:border-2 hover:shadow-none hover:border-primary-dark cursor-pointer"
        >
          <ChatRounded className="text-primary-main mt-2 ml-2 text-8xl" />
          <Stack p={3} pt={0} mt={2} className="flex flex-col items-center">
            <Typography fontWeight="bold" variant="h5">
              JS CONVERTER
            </Typography>
            <Typography variant="h6">
              Translate English to JavaScript code
            </Typography>
          </Stack>
        </Card>
      </div>
      <div className="p-3 flex flex-col justify-center items-center">
        <Typography variant="h4" mb={2} fontWeight="bold">
          AI SCIFI Images
        </Typography>
        <Card
          onClick={() => navigate("/scifi-image")}
          className="shadow-md flex flex-col items-center rounded-lg h-64 w-64 hover:border-2 hover:shadow-none hover:border-primary-dark cursor-pointer"
        >
          <ChatRounded className="text-primary-main mt-2 ml-2 text-8xl" />
          <Stack p={3} pt={0} mt={2} className="flex flex-col items-center">
            <Typography fontWeight="bold" variant="h5">
              Scifi Image
            </Typography>
            <Typography variant="h6">Generate Scifi images</Typography>
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default Homepage;
