import React from 'react'

const UserSearch = ({searchKey,setSearchKey}) => {
  return (
    <div className='relative'>
      <input type="text" placeholder='search user' className='rounded-full w-full'
      value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <i className="ri-search-line absolute top-2 left-1 text-gray-500"></i>
    </div>
  )
}

export default UserSearch
