import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get("/getPost", (req, res) => {
  res.send({ success: true }); // Corrected line
});

app.get("/getUser", (req, res) => {
  res.send({ success: true });
});

app.post("/newUser", (req, res) => {
  res.send({ success: true });
});

app.post("/newPost", (req, res) => {
  res.send({ success: true });
});

app.patch("/updatePost", (req, res) => {
  res.send({ success: true });
});

app.delete("/deletePost", (req, res) => {
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
