import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json()); // Parses JSON request body
app.use(cors()); // Enable CORS

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Blog API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
