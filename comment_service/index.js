const express = require("express");
const cookieParser = require("cookie-parser");

const configHeader = require('./src/utils/set-headers')
const commentRoutes = require('./src/routes/comment')
const server = express();

// Some Configuration

server.use(cookieParser()); // process.env.COOKIE_SECRET for signed cookie
server.use(express.json()); // for JSON type request
server.use(configHeader); // set Header for frontEnd/ preflight
// Routes 

server.use('/api/v1/comment', commentRoutes)

// DB Configuration 

server.listen(process.env.PORT || 8003, () => {
  console.log("Comment-Service is running on PORT 8003");
});
