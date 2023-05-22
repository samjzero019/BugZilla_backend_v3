require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const userRoutes = require("./src/routes/user");
const configHeader = require("./src/utils/set-headers");

const server = express();

// Some Configuration
server.use(express.json());
server.use(cookieParser());
server.use(configHeader);
// Routes
server.use("/api/v1/user", userRoutes);

//DB Configuration

mongoose
  .connect(process.env.MONGO_DB_CON_STRING)
  .then((response) => {
    console.log(`User Service is connected to ${response.connection.name}`);
    server.listen(process.env.PORT || 8002, () => {
      console.log(`User Service is running on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to Connect to DB: `, err.message);
  });
