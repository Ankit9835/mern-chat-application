import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, sendMessage } from '../../../apicalls/messages'
import { hideLoader, showLoader } from '../../../redux/loaderSlice'
import moment from "moment"
import { ClearChatMessages } from '../../../apicalls/chats'
import store from "../../../redux/store";

const ChatUser = ({socket}) => {
    const [newMessage,setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const dispatch = useDispatch()
    const {selectedChats,user} = useSelector((state) => state.userReducer)
    const receipentUser = selectedChats.members.find((mem) => mem._id != user._id)
    console.log(receipentUser)

    const createMessage = async () => {
        try {
            const req = {
                chat: selectedChats._id,
                sender: user._id,
                text: newMessage
            }
            socket.emit("send-messages", {
                ...req,
                members: selectedChats.members.map((mem) => mem._id),
                createdAt: moment().format("DD-MM-YYYY hh:mm:ss"),
                read: false
            })
            const response = await sendMessage(req)
            
           
                setNewMessage('')
            
        } catch (error) {
            console.log(error)
        }
    }

    const getAllMessages = async() => {
        try {
            dispatch(showLoader())
            const response = await getMessages(selectedChats._id)
            console.log('qqqqqqqqqqqqqqq',response)
            dispatch(hideLoader())
           
                setMessages(response.data)
            
        } catch (error) {
            dispatch(hideLoader())
            console.log(error.message)
        }
    }

    const clearUnreadMsg = async() => {
        try {
            dispatch(showLoader())
            const response = await ClearChatMessages(selectedChats._id);
            dispatch(hideLoader())
            console.log('mmmmm',response)
             if (response.success) {
        const updatedChats = allChats.map((chat) => {
          if (chat._id === selectedChat._id) {
            return response.data;
          }
          return chat;
        });
        dispatch(SetAllChats(updatedChats));
      }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getAllMessages()
        if(selectedChats?.lastMessage?.sender != user._id){
            clearUnreadMsg() 
        }

        socket.off('receive-messages').on('receive-messages', (message) => {
            const tempSelectedChat = store.getState().userReducer.selectedChats
            if(tempSelectedChat._id === message.chat){
                setMessages((prev) => [...prev, message])
            }
        })
    },[selectedChats])

    useEffect(() => {
    // always scroll to bottom for messages id
    const messagesContainer = document.getElementById("messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messages]);

    

  return (
    <div className='shadow bg-white border rounded-2xl flex flex-col justify-between h-[80vh] p-5'>
        <div>
             <div className='flex gap-2'>
                    {receipentUser?.profilePic && 
                        <img src={receipentUser.profilePic} className='w-10 h-10 rounded-full' />
                    }
                    {!receipentUser?.profilePic && 
                        (
                            <div className='uppercase text-2xl font-semibold'>
                                {receipentUser?.name[0]}
                            </div>
                        )
                    }
                    {receipentUser?.name}
                </div>
        </div>
        <div className='h-[55vh] overflow-y-scroll p-5' id="messages">
           <div className='flex flex-col gap-2'>
                {messages.map((mess) => {
                    const isCurrentUser = mess.sender === user._id
                    return (
                        <div key={mess._id} className={`flex ${isCurrentUser && "justify-end"}`}>
                            <div className='flex flex-col'>
                                <h1 className={`${isCurrentUser ? "bg-primary text-white" : "bg-gray-200 text-primary"} p-2 rounded-xl rounded-bl-0`}>{mess.text}</h1>
                                <h1 className="text-gray-500 text-sm">
                                    {moment(mess.createdAt).format("hh:mm A")}
                                </h1>
                            </div>
                            {isCurrentUser && <i className={`ri-check-double-line ${mess.read ? "text-green-700" : "text-gray-500"}` }></i>}
                        </div>
                    )
                })}
           </div>
        </div>
        <div className='h-16 rounded-xl border-gray-100 shadow border'>
            <input type="text" className='w-[90%] h-full rounded-xl focus:border-none' placeholder='write a message' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
            <button className='bg-primary text-white p-2 rounded' onClick={() => createMessage()}>
                <i className="ri-send-plane-2-line text-white"></i>
            </button>
        </div>      
    </div>
  )
}

export default ChatUser
