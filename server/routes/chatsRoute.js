const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();
const Chat = require('../models/chatModel');


router.post('/create-new-chat', authMiddleware, async (req,res) => {
    try {
        const newChat = new Chat(req.body)
        const saveChat = await newChat.save()
        res.send({
            success:true,
            message:'chat created successfully',
            data: saveChat
        })
    } catch (error) {
        res.send({
        success: false,
        message: "Error creating chat",
        error: error.message,
        });
    }
})

router.get('/get-all-chat', authMiddleware, async (req,res) => {
    try {
        const chat = await Chat.find({
            members:{
                $in: [req.user.id]
            }
        }).populate('members').populate('lastMessage').sort({updatedAt: -1})
       
        res.send({
            success:true,
            message:'chat fetched successfully',
            data: chat
        })
    } catch (error) {
         res.send({
            success: false,
            message: "Error fetching chats",
            error: error.message,
        });
    }
})

module.exports = router;