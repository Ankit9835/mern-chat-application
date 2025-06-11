import React, { useEffect, useState } from 'react'
import UserSearch from './components/UserSearch'
import UsersList from './components/UsersList'
import ChatUser from './components/ChatUser'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client";
const socket = io("http://localhost:5000")
const Home = () => {
  
  const [searchKey,setSearchKey] = useState('')
  const {selectedChats,user} = useSelector(state => state.userReducer)

  useEffect(() => {
    if(user){
      socket.emit('joinRoom',user._id)

  
    }
  },[user])
  return (
    <div className='flex gap-3'>
      <div className='w-96'>
        <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
        <UsersList searchKey={searchKey} />
      </div>
      {selectedChats && <div className='w-full'>
        <ChatUser socket={socket} />
      </div>}
    </div>
  )
}

export default Home
