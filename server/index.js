require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000
const usersRoute = require("./routes/userRoute");
const chatsRoute = require("./routes/chatsRoute");
const messageRoute = require("./routes/messageRoute");

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // optional: only if using cookies
}));
app.use(
  express.json()
);

app.use('/api/users', usersRoute)
app.use('/api/chats', chatsRoute)
app.use('/api/messages', messageRoute)

app.listen(port, ()=> console.log(`server listening on port ${port}`))