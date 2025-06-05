import React from 'react'
import { currentUser, getAllUsers } from '../apicalls/users'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetAllUsers, SetUser } from '../redux/userSlice'

const ProtectedRoute = ({children}) => {
  const {user,allUser} = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getCurrentUser = async () => {
    try {
        const response = await currentUser()
        const allUsers = await getAllUsers()
        console.log('restttttttttttt',allUsers.data)
        if(response.success){
            dispatch(SetUser(response.data))
            console.log('length', allUser.length)
            if (allUser.length === 0) {
    dispatch(SetAllUsers(allUsers.data));
  }
            
        } else {
          console.log('test')
            navigate('/login')
        }
    } catch (error) {
        console.log('error',error.response)
        navigate('/login')
    }
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
        getCurrentUser()
    } else {
      navigate('/login')
    }
  },[])

  

  return (
    <div className='h-screen w-screen bg-gray-200'>
      <div className='flex items-center justify-between p-5'>
          <div className='flex items-center gap-1'>
              <i className="ri-message-3-line text-2xl text-white"></i>
              <h1 className='text-primary text-2xl uppercase text-bold'>SheyChat</h1>
          </div>
          <div className='flex items-center gap-1'>
              <i className="ri-shield-user-line text-primary"></i>
              {user?.name}
               <i
            className="ri-logout-circle-r-line ml-5 text-xl cursor-pointer text-primary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          ></i>
          </div>
      </div>
      <div className='p-5'>
        {children}
      </div>
    </div>
  )
}

export default ProtectedRoute
