const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load env vars
dotenv.config({ path: "./config/.env" });

// Connect to database
const mongooseOptions = {
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD,
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URL, mongooseOptions)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("0", err);
    err.then((e) => console.log("0.1", e)).catch((e) => console.log("0.2", e));
  });

// init app
const app = express();

// Body parser
app.use(express.json());

// Routes
const routes = require("./routes/index");
app.use("/", routes);

// page
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const PORT = process.env.PORT || 5013;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
