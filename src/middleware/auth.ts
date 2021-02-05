import { UserBaseDocumentType } from "./../model/UserModel";
import User from "../model/UserModel";
import { NextFunction } from "express";
import { CustomRequest } from "../routes/User";

export interface CheckedUserType extends CustomRequest {
  checkedUser: UserBaseDocumentType;
}

export const auth = (req: CheckedUserType, _res, next: NextFunction) => {
  let token = req.cookies.authorized_user;
  User.findByToken(token, (doc) => {
    req.checkedUser = doc;
    next();
  });
};
