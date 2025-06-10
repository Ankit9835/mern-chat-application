const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');

router.post('/create-message', authMiddleware, async(req,res) => {
    try {
        const message =  new Message(req.body)
        const savedMessage = await message.save()

        const chat = await Chat.findOneAndUpdate({
            _id: req.body.chat
        }, {
            lastMessage: savedMessage._id,
            unread:{
                $inc:1
            }
        })
        chat.lastMessage = savedMessage._id
        await chat.save()
        return res.send({
            message:"message created successfully",
            status:200,
            data:message
        })
    } catch (error) {
        console.log(error)
        return res.send({
            message:"something went wrong",
            status:200,
            data:error.message
        })
    }
})

router.get('/get-all-message/:chatId', authMiddleware, async (req,res) => {
    try {
        console.log(req.params.chatId)
        const message = await Message.find({
            chat:req.params.chatId
        }).sort({createdAt: 1})
        console.log('rrrrrr',message)
        return res.send({
            message:"message fetched successfully",
            status:200,
            data:message
        })
    } catch (error) {
        
    }
})

module.exports = router;
