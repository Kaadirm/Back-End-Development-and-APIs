let express = require("express");
let app = express();

module.exports = app;

app.get("/", (req, res) => {
  res.send("Hello Express");
});
