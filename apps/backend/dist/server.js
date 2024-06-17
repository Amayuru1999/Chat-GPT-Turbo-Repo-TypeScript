"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const openaiRoutes_1 = __importDefault(require("./routes/openaiRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Load environment variables from .env file
dotenv_1.default.config();
// Connect to MongoDB
(0, db_1.default)();
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use(errorMiddleware_1.default);
app.use((0, cookie_parser_1.default)());
// Routes
app.get('/', (req, res) => {
    res.send('API is running');
});
app.get('/api/v1/openai', (req, res) => {
    res.send('OpenAI Running');
});
// API routes
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/openai", openaiRoutes_1.default);
// Define port
const PORT = parseInt(process.env.PORT || "8080");
// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT} ⚡`);
});
