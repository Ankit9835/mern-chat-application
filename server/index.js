require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000
const usersRoute = require("./routes/userRoute");
const chatsRoute = require("./routes/chatsRoute");
const messageRoute = require("./routes/messageRoute");

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true, // optional: only if using cookies
// }));
app.use(
  express.json()
);

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors:{
    origin:"http://localhost:5173",
    methods: ["GET","POST"]
  }
})

io.on('connection', (socket) => {
  socket.on("joinRoom", (userId) => {
    console.log("user joined", userId)
    socket.join(userId)
  })

  socket.on("send-messages", (message) => {
    console.log('lllll',message)
    io.to(message.members[0]).to(message.members[1]).emit("receive-messages", message)
  })
  
})

app.use('/api/users', usersRoute)
app.use('/api/chats', chatsRoute)
app.use('/api/messages', messageRoute)

server.listen(port, ()=> console.log(`server listening on port ${port}`))