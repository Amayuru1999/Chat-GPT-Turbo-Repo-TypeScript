import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import colors from "colors";
import dotenv from "dotenv";
import  connectDB  from "./config/db";
import  errorHandler  from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import openaiRoutes from "./routes/openaiRoutes";
import cookieParser from "cookie-parser"; 

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);
app.use(cookieParser())

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/v1/openai', (req, res) => {
  res.send('OpenAI Running');
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", openaiRoutes);

// Define port
const PORT: number = parseInt(process.env.PORT || "8080");

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT} ⚡`);
});
