import * as express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello this is a test page" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening port 5000, working");
});
