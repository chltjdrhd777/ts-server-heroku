import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import mongoose from "mongoose";
const mongoDBAccessKey = require("./config/key");
//initializing app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieparser());

//initializing mongoose
mongoose
  .connect(mongoDBAccessKey.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("monogoDB is connected");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "hello this is a test page" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening port 5000, working");
});
