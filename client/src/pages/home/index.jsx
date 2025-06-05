import React, { useState } from 'react'
import UserSearch from './components/UserSearch'
import UsersList from './components/UsersList'
import ChatUser from './components/ChatUser'

const Home = () => {
  const [searchKey,setSearchKey] = useState('')
  return (
    <div className='flex gap-2'>
      <div className='w-96'>
        <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
        <UsersList searchKey={searchKey} />
      </div>
      <div>
        <ChatUser />
      </div>
    </div>
  )
}

export default Home
