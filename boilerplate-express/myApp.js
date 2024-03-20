require("dotenv").config();

let express = require("express");
let app = express();

module.exports = app;

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/index.html");

// });

// // Normal usage
// app.use(express.static(__dirname + "/public"));

// // Assets at the /public route
// app.use("/public", express.static(__dirname + "/public"));

// app.get("/json", (req, res) => {
//   // res.json({ message: "Hello json" });
//   const messageStyle = process.env.MESSAGE_STYLE

//   if (messageStyle === "uppercase") {
//     res.json({"message": "HELLO JSON" });
//   } else {
//     res.json({ "message": "Hello json" });
//   }
// });

// app.use((req, res, next) => {
//   console.log(`${req.method} / ${req.path} - ${req.ip}`);
//   next();
// })

// app.get(
//   "/now",
//   (req, res, next) => {
//     req.time = new Date().toString();
//     next();
//   },
//   (req, res) => {
//     res.json({ time: req.time });
//   }
// );

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

// // app.listen(8080);
