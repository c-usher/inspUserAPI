require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

//API security
app.use(helmet());

//Handle cors error
app.use(cors());

//MongoDB Connection
await mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//Logs each request
app.use(morgan("tiny"));

//Set body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Load routers
const userRouter = require("./src/routers/user_router");
const unitRouter = require("./src/routers/unit_router");

//Use routers
app.use("/login/user", userRouter);
app.use("/unit", unitRouter);

//Handle error
const handleError = require("./src/utils/error_handler");

app.use((req, res, next) => {
  const error = new Error("Route not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
