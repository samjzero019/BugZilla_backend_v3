require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const authRoutes = require("./src/routes/auth");
const { default: mongoose } = require("mongoose");

const server = express();

// Some Configuration
server.use(express.json());
// Routes
server.use("/api/v1/auth", authRoutes);

// DB Configuration

mongoose
  .connect(process.env.MONGO_DB_CON_STRING)
  .then((response) => {
    // console.log("Response of DB connection: ", response);
    console.log(
      `Database Connection Successful. Connected with Collection: ${response.connection.name}`
    );
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Auth Service is running on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect Database", err.message);
    process.exit(0);
  });
