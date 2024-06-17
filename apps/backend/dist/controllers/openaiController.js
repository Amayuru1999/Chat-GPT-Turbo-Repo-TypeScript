"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scifiImageController = exports.jsconverterController = exports.chatbotController = exports.paragraphController = exports.summaryController = exports.runController = void 0;
const dotenv = __importStar(require("dotenv"));
const openai_1 = require("openai");
const generative_ai_1 = require("@google/generative-ai");
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
const configuration = new openai_1.Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
const runController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const text = response.text();
        return res.status(200).json({ text });
    }
    catch (error) {
        console.error("Error in runController:", error);
        return res.status(500).json({ message: "Error generating content", error: error.message });
    }
});
exports.runController = runController;
const summaryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { text } = req.body;
        const response = yield openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "Summarize this" }, { role: "user", content: text }],
            max_tokens: 500,
            temperature: 0.5,
        });
        if (response.data && ((_c = (_b = (_a = response.data.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content)) {
            return res.status(200).json(response.data.choices[0].message.content);
        }
        throw new Error('No response text');
    }
    catch (err) {
        console.error('Error in summaryController:', err.response ? err.response.data : err.message);
        return res.status(500).json({ message: err.message });
    }
});
exports.summaryController = summaryController;
const paragraphController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { text } = req.body;
        const response = yield openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "Write a detailed paragraph about this" }, { role: "user", content: text }],
            max_tokens: 500,
            temperature: 0.5,
        });
        const content = (_f = (_e = (_d = response.data) === null || _d === void 0 ? void 0 : _d.choices[0]) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.content;
        if (content) {
            return res.status(200).json(content);
        }
        throw new Error('No response text');
    }
    catch (err) {
        console.error('Error in paragraphController:', err.response ? err.response.data : err.message);
        return res.status(500).json({ message: err.message });
    }
});
exports.paragraphController = paragraphController;
const chatbotController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { text } = req.body;
        const response = yield openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "Chat with the user" }, { role: "user", content: text }],
            max_tokens: 300,
            temperature: 0.7,
        });
        const content = (_j = (_h = (_g = response.data) === null || _g === void 0 ? void 0 : _g.choices[0]) === null || _h === void 0 ? void 0 : _h.message) === null || _j === void 0 ? void 0 : _j.content;
        if (content) {
            return res.status(200).json(content);
        }
        throw new Error('No response text');
    }
    catch (err) {
        console.error('Error in chatbotController:', err.response ? err.response.data : err.message);
        return res.status(500).json({ message: err.message });
    }
});
exports.chatbotController = chatbotController;
const jsconverterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { text } = req.body;
        const response = yield openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "Convert these instructions into JavaScript code" }, { role: "user", content: text }],
            max_tokens: 400,
            temperature: 0.25,
        });
        const content = (_m = (_l = (_k = response.data) === null || _k === void 0 ? void 0 : _k.choices[0]) === null || _l === void 0 ? void 0 : _l.message) === null || _m === void 0 ? void 0 : _m.content;
        if (content) {
            return res.status(200).json(content);
        }
        throw new Error('No response text');
    }
    catch (err) {
        console.error('Error in jsconverterController:', err.response ? err.response.data : err.message);
        return res.status(500).json({ message: err.message });
    }
});
exports.jsconverterController = jsconverterController;
const scifiImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    try {
        const { text } = req.body;
        const response = yield openai.createImage({
            prompt: `Generate a sci-fi image of ${text}`,
            n: 1,
            size: "512x512",
        });
        const imageUrl = (_p = (_o = response.data) === null || _o === void 0 ? void 0 : _o.data[0]) === null || _p === void 0 ? void 0 : _p.url;
        if (imageUrl) {
            return res.status(200).json(imageUrl);
        }
        throw new Error('No image URL found');
    }
    catch (err) {
        console.error('Error in scifiImageController:', err.response ? err.response.data : err.message);
        return res.status(500).json({ message: err.message });
    }
});
exports.scifiImageController = scifiImageController;
