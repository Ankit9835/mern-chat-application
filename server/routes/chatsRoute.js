const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');


router.post('/create-new-chat', authMiddleware, async (req,res) => {
    try {
        const newChat = new Chat(req.body)
        const saveChat = await newChat.save()
        await savedChat.populate("members");
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

router.post('/clear-unread-messages', authMiddleware, async(req,res) => {
    try {
        const chat = Chat.findById(req.body.chat)
        if(!chat){
            return res.send({
                success: false,
                message: "Chat not found",
            });
        }

        const updatedChat = await Chat.findByIdAndUpdate(
      req.body.chat,
      {
        unreadMessages: 0,
      },
      { new: true }
    )
      .populate("members")
      .populate("lastMessage");

      console.log('update',updatedChat)

    // find all unread messages of this chat and update them to read
    await Message.updateMany(
      {
        chat: req.body.chat,
        read: false,
      },
      {
        read: true,
      }
    );
    res.send({
      success: true,
      message: "Unread messages cleared successfully",
      data: updatedChat,
    });
    } catch (error) {
        
    }
})

module.exports = router;