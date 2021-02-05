import express, { Router, Request, Response } from "express";
import User, { UserBaseDocumentType } from "../model/UserModel";

const router = Router();

//typeDef
interface CumstomRequest extends Request<{}, {}, UserBaseDocumentType> {}

router.post("/register", (req: CumstomRequest, res) => {
  if (!req.body.email || !req.body.password) {
    return res.json({
      success: false,
      message: "u didn't put the email or password",
    });
  }

  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false });

    return res.status(200).json({ success: true, doc });
  });
});

export default router;
