const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/.env" });

const app = express();

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
