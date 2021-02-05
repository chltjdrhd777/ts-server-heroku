import { CheckedUserType } from "./../middleware/auth";
import { Router, Request, Response } from "express";
import User, { UserBaseDocumentType } from "../model/UserModel";
import { auth } from "../middleware/auth";

const router = Router();

//typeDef
export interface CustomRequest extends Request<{}, {}, UserBaseDocumentType> {}

router.post("/register", (req: CustomRequest, res) => {
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

router.post("/login", (req: CustomRequest, res) => {
  User.findOne({ email: req.body.email }).then((targetUser) => {
    if (!targetUser) {
      res.json({ loginstate: false, message: "there is no matched user" });
    } else {
      targetUser.comparePassword(req.body.password).then((result) => {
        if (!result) {
          res.json({ loginstate: false, message: "wrong password" });
        } else {
          targetUser.generateToken().then((tokenUpdatedUser) => {
            if (!tokenUpdatedUser)
              return res.json({
                loginstate: false,
                message: "Thoken is not updated successfully",
              });

            res
              .cookie("authorized_user", tokenUpdatedUser.token)
              .status(200)
              .json({ loginstate: true, message: "login complete" });
          });
        }
      });
    }
  });
});

router.get("/logout", auth, (req: CheckedUserType, res) => {
  User.findOneAndUpdate(
    { _id: req.checkedUser._id },
    { token: "" },
    { new: true },
    (err, doc) => {
      if (err)
        res.json({ success: false, message: "you couldn't log out, lol" });
      res.json({ success: true, message: "bye bye", doc });
    }
  );
});

export default router;
