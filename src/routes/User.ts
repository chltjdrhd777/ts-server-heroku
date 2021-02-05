import express, { Router, Response } from "express";

const router = Router();

router.get("/register", (req, res) => {
  res.json({ messgae: "work" });
});

export default router;
