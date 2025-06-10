import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, sendMessage } from '../../../apicalls/messages'
import { hideLoader, showLoader } from '../../../redux/loaderSlice'
import moment from "moment"

const ChatUser = () => {
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
            dispatch(showLoader())
            const response = await sendMessage(req)
            dispatch(hideLoader())
            if(response.success){
                setNewMessage('')
            }
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

    useEffect(() => {
        getAllMessages()
    },[selectedChats])

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
        <div className='h-[55vh] overflow-y-scroll p-5'>
           <div className='flex flex-col gap-2'>
                {messages.map((mess) => {
                    const isCurrentUser = mess.sender === user._id
                    return (
                        <div className={`flex ${isCurrentUser && "justify-end"}`}>
                            <div className='flex flex-col'>
                                <h1 className={`${isCurrentUser ? "bg-primary text-white" : "bg-gray-200 text-primary"} p-2 rounded-xl rounded-bl-0`}>{mess.text}</h1>
                                <h1 className="text-gray-500 text-sm">
                                    {moment(mess.createdAt).format("hh:mm A")}
                                </h1>
                            </div>
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
