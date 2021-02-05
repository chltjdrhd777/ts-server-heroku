import express, { Router, Response } from "express";

const router = Router();

router.post("/register", (req, res) => {
  res.json({ messgae: "work" });
});

export default router;
