require("dotenv").config({ path: __dirname + "/.env" });

const express = require('express')
const cookieParser = require("cookie-parser");

const userRoutes = require('./src/routes/user')
const configHeader = require('./src/utils/set-headers')

const server = express()

// Some Configuration
server.use(express.json())
server.use(cookieParser())
server.use(configHeader)
// Routes
server.use('/api/v1/user', userRoutes)


server.listen(process.env.PORT || 8002, ()=>{
    console.log(`User Service is running on Port ${process.env.PORT }`)
})











