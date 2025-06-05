import { useSelector } from "react-redux"

const UsersList = ({searchKey}) => {
  const {allUser} = useSelector(state => state.userReducer)
  console.log('users',allUser)

 
  return (
    <div>
     {allUser.filter((obj) => obj.name.toLowerCase().includes(searchKey.toLowerCase()))
     .map((user) => {
        return (
            <div key={user._id} className='shadow border p-5'>
                <div className='flex gap-2'>
                    {user?.profilePic && 
                        <img src={user.profilePic} className='w-10 h-10 rounded-full' />
                    }
                    {!user?.profilePic && 
                        (
                            <div className='uppercase text-2xl font-semibold'>
                                {user?.name[0]}
                            </div>
                        )
                    }
                    {user?.name}
                </div>
            </div>
        )
     })}
    </div>
  )


}
 export default UsersList