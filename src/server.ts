import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer"; // For handling image uploads
import path from "path";
import User from "./models/User";
import userRoutes from "./routes/user.routes"; // ✅ Import User Routes
import Post from "./models/Post";

dotenv.config();
const app = express();
app.use(express.json());


// 1️⃣ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 2️⃣ Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// 3️⃣ Test route to create a Post with Markdown & Image
app.post("/test/post", upload.single("image"), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const newPost = new Post({ title, content, image, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
});
// 🟢 Register Routes
app.use("/api/users", userRoutes);  // ✅ All routes inside user.routes.ts start with /api/users

// 4️⃣ Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 5️⃣ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

