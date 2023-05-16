require("dotenv").config({ path: __dirname + "/.env" });

const express = require('express')
const authRoutes = require('./src/routes/auth')


const server = express()

// Some Configuration
server.use(express.json())
// Routes
server.use('/api/v1/auth', authRoutes)


server.listen(process.env.PORT || 8000, ()=>{
    console.log(`Auth Service is running on Port ${process.env.PORT }`)
})











