require('dotenv').config()
const express = require('express')
const app = express()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000
const usersRoute = require("./routes/userRoute");
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use('/api/users', usersRoute)
app.listen(port, ()=> console.log(`server listening on port ${port}`))