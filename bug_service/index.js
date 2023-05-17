//ENV Configuration
require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");

const bugRoutes = require("./src/routes/bug");


const configHeader = require("./src/utils/set-headers");

const server = express();

// Some Configuration
server.use(cookieParser()); // process.env.COOKIE_SECRET for signed cookie
server.use(express.json()); // for JSON type request
server.use(configHeader); // set Header for frontEnd/ preflight

// Routes
server.use("/api/v1/bug", bugRoutes);




// DB Configuration


//Server 

server.listen(process.env.PORT || 8001, () => {
  console.log("Bug Service is listening on  port 8001");
});