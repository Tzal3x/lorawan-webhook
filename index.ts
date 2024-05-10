const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = 3000;

app.post("/", (req, res) => {
  const arduinoLedState = req.body.uplink_message.decoded_payload;
  console.log(arduinoLedState);
  res.send("Express: POST received!");
});

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
