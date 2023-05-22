require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const configHeader = require("./src/utils/set-headers");
const commentRoutes = require("./src/routes/comment");
const server = express();

// Some Configuration

server.use(cookieParser()); // process.env.COOKIE_SECRET for signed cookie
server.use(express.json()); // for JSON type request
server.use(configHeader); // set Header for frontEnd/ preflight
// Routes

server.use("/api/v1/comment", commentRoutes);

// DB Configuration

mongoose
  .connect(process.env.MONGO_DB_CON_STRING)
  .then((response) => {
    // console.log("Response of DB connection: ", response);
    console.log(
      `Database Connection Successful. Connected with Collection: ${response.connection.name}`
    );
    server.listen(process.env.PORT || 8003, () => {
      console.log(`Auth Service is running on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect Database", err.message);
    process.exit(0);
  });
