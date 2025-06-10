import React, { useState } from 'react'
import UserSearch from './components/UserSearch'
import UsersList from './components/UsersList'
import ChatUser from './components/ChatUser'
import { useSelector } from 'react-redux'

const Home = () => {
  const [searchKey,setSearchKey] = useState('')
  const {selectedChats} = useSelector(state => state.userReducer)
  return (
    <div className='flex gap-3'>
      <div className='w-96'>
        <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
        <UsersList searchKey={searchKey} />
      </div>
      {selectedChats && <div className='w-full'>
        <ChatUser />
      </div>}
    </div>
  )
}

export default Home
