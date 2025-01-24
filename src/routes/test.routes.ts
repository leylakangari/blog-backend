import express from "express";

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({ message: "Test route is working!" });
});

export default router;
