const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;

//API security
app.use(helmet());

//Handle cors error
app.use(cors());

//Logs each request
app.use(morgan("tiny"));

//Set body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", (req, res) => {
  res.json({ message: "Message works!!" });
});

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
