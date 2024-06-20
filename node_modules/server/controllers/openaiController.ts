import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Request, Response } from 'express';


dotenv.config();


const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY!;
const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY!;


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const runController = async (req: Request, res: Response) => {
  try {
 
    const { prompt } = req.body;


    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

 
    return res.status(200).json({ text });
  } catch (error: any) { 
    console.error("Error in runController:", error);
    return res.status(500).json({ message: "Error generating content", error: error.message });
  }
};

export const summaryController = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "Summarize this" }, { role: "user", content: text }],
      max_tokens: 500,
      temperature: 0.5,
    });
    if (response.data && response.data.choices?.[0]?.message?.content) {
      return res.status(200).json(response.data.choices[0].message.content);
    }
    throw new Error('No response text');
  } catch (err: any) {
    console.error('Error in summaryController:', err.response ? err.response.data : err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const paragraphController = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "Write a detailed paragraph about this" }, { role: "user", content: text }],
      max_tokens: 500,
      temperature: 0.5,
    });
    const content = response.data?.choices[0]?.message?.content;
    if (content) {
      return res.status(200).json(content);
    }
    throw new Error('No response text');
  } catch (err: any) {
    console.error('Error in paragraphController:', err.response ? err.response.data : err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const chatbotController = async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "Chat with the user" }, { role: "user", content: text }],
        max_tokens: 300,
        temperature: 0.7,
      });
      const content = response.data?.choices[0]?.message?.content;
      if (content) {
        return res.status(200).json(content);
      }
      throw new Error('No response text');
    } catch (err: any) {
      console.error('Error in chatbotController:', err.response ? err.response.data : err.message);
      return res.status(500).json({ message: err.message });
    }
  };
  export const jsconverterController = async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "Convert these instructions into JavaScript code" }, { role: "user", content: text }],
        max_tokens: 400,
        temperature: 0.25,
      });
      const content = response.data?.choices[0]?.message?.content;
      if (content) {
        return res.status(200).json(content);
      }
      throw new Error('No response text');
    } catch (err: any) {
      console.error('Error in jsconverterController:', err.response ? err.response.data : err.message);
      return res.status(500).json({ message: err.message });
    }
  };

  export const scifiImageController = async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      const response = await openai.createImage({
        prompt: `Generate a sci-fi image of ${text}`,
        n: 1,
        size: "512x512",
      });
      const imageUrl = response.data?.data[0]?.url;
      if (imageUrl) {
        return res.status(200).json(imageUrl);
      }
      throw new Error('No image URL found');
    } catch (err: any) {
      console.error('Error in scifiImageController:', err.response ? err.response.data : err.message);
      return res.status(500).json({ message: err.message });
    }
  };