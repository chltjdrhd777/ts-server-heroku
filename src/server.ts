import express from "express";
import cors from "cors";
//initializing app
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "hello this is a test page" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening port 5000, working");
});
