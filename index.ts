const express = require("express");
const app = express();
const port = 3000;

app.post("/", (req, res) => {
  console.log("POST");
  res.send("Express: POST received!");
});

app.get("/", (req, res) => {
  console.log("GET");
  res.send("Express: GET received!");
});

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
