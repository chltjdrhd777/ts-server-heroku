import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//typeDef
export interface UserBaseDocumentType extends Document {
  name: string;
  email: string;
  password: string;
  lastname: string;
  role: number;
  art: [];
  history: [];
  image: string;
  token: string;
  tokenExp: string;
  comparePassword(plainPassword: string): Promise<boolean>;
  generateToken(): Promise<UserBaseDocumentType>;
}

interface UserStatics extends Model<UserBaseDocumentType> {
  findByToken(token: string, callback: any): void;
}

//Schema
const userSchema: Schema<
  UserBaseDocumentType,
  UserStatics
> = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//methods
userSchema.pre<UserBaseDocumentType>("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  let user = this as UserBaseDocumentType;
  return bcrypt.compare(plainPassword, user.password);
};

userSchema.methods.generateToken = function () {
  let user = this as UserBaseDocumentType;
  let token = jwt.sign(user._id.toHexString(), "secret");
  user.token = token;
  user.save();
  return Promise.resolve(user);
};

//export
export default mongoose.model<UserBaseDocumentType, UserStatics>(
  "User",
  userSchema
);
