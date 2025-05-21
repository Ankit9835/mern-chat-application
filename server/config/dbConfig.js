const mongoose = require('mongoose')
console.log('MONGO_URL:', process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection

db.on('connected', () => {
    console.log('connection successfull')
})

db.on('error', () => {
    console.log('error')
})

module.exports = db