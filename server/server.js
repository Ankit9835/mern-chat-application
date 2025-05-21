require('dotenv').config()
const express = require('express')
const app = express()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`server listening on port ${port}`))