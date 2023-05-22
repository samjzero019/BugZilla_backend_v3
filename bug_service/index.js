//ENV Configuration
require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");

const bugRoutes = require("./src/routes/bug");
const Bug = require("./src/models/Bug");
const configHeader = require("./src/utils/set-headers");

const server = express();

// Some Configuration
server.use(cookieParser()); // process.env.COOKIE_SECRET for signed cookie
server.use(express.json()); // for JSON type request
server.use(configHeader); // set Header for frontEnd/ preflight

// Routes
server.use("/api/v1/bug", bugRoutes);

// DB Configuration

mongoose
  .connect(process.env.MONGO_DB_CON_STRING)
  .then((response) => {
    // console.log("Response of DB connection: ", response);
    console.log(
      `Database Connection Successful. Connected with Collection: ${response.connection.name}`
    );
    server.listen(process.env.PORT || 8001, () => {
      console.log("Bug Service is listening on  port 8001");
    });
  })
  .catch((err) => {
    console.log("Failed to connect Database", err.message);
    process.exit(0);
  });

//Server
