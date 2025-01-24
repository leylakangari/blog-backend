import express from "express";

const router = express.Router();

// 🟢 Test Route
router.get("/test", (req, res) => {
  res.json({ message: "User test route is working!" });
});

export default router;
