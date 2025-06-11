import { useDispatch, useSelector } from "react-redux"
import { createChats } from "../../../apicalls/chats"
import { SetAllChats, SetSelectedChats } from "../../../redux/userSlice"
import toast from "react-hot-toast"
import { hideLoader, showLoader } from "../../../redux/loaderSlice"
import moment from "moment"

const UsersList = ({searchKey}) => {
    const dispatch = useDispatch()
  const {allUser, allChats, user, selectedChats} = useSelector(state => state.userReducer)
  const insertChats = async(receipentUserId) => {
    try {
      dispatch(showLoader());
      const response = await createChats([user._id, receipentUserId]);
      dispatch(hideLoader());
      if (response.success) {
        toast.success(response.message);
        const newChat = response.data;
        const updatedChats = [...allChats, newChat];
        dispatch(SetAllChats(updatedChats));
       // dispatch(SetSelectedChats(newChat));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  }

  const openChat = (receipentUserId) => {
    const chat = allChats.find(
      (chat) =>
        chat.members.map((mem) => mem._id).includes(user._id) &&
        chat.members.map((mem) => mem._id).includes(receipentUserId)
    );
    console.log('open',chat)
    if (chat) {
      dispatch(SetSelectedChats(chat));
    }
    
  }

  const getChat = () => {
    if(searchKey){
      return allChats
    }
    return allUser.filter((obj) => obj.name.toLowerCase().includes(searchKey.toLowerCase()))
    // return allUser.filter((obj) => obj.name.toLowerCase().includes(searchKey.toLowerCase())) ||
    //     allChats.map((chat) => chat.members.map((mem) => mem._id)).includes(user._id)
  }

  const getSelectedChats = (userId) => {
    if(selectedChats){
        return selectedChats.members.map((mem) => mem._id).includes(userId._id)
    }
  }

   const getLastMsg = (userObj) => {
    const chat = allChats.find((chat) =>
      chat.members.map((mem) => mem._id).includes(userObj._id)
    );
    if (!chat || !chat.lastMessage) {
      return "";
    } else {
      const lastMsgPerson =
        chat?.lastMessage?.sender === user._id ? "You : " : "";
      return (
        <div className="flex justify-between w-72">
          <h1 className="text-gray-600 text-sm">
            {lastMsgPerson} {chat?.lastMessage?.text}
          </h1>
          <h1 className="text-gray-500 text-sm">
            {moment(chat.lastMessage.createdAt).format("hh:mm A")}
          </h1>
        </div>
      );
    }
  };

  const getUnReadMsg = (userObj) => {
    const chat = allChats.find((chat) => chat.members.map((mem) => mem._id).includes(userObj._id))
    if (
      chat &&
      chat?.unreadMessages &&
      chat?.lastMessage?.sender !== user._id
    ) {
      return (
        <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {chat?.unreadMessages}
        </div>
      );
    }
  }
  
  return (
    <div>
     {getChat()
     .map((chatObjOrUserObj) => {
      let user = chatObjOrUserObj
      if(chatObjOrUserObj.members){
        user = chatObjOrUserObj.members.find((mem) => mem._id !== user._id)
      }
        return (
            <div key={user._id} className={`shadow border p-5 flex justify-between cursor-pointer ${getSelectedChats(user) && "border-primary border-2"}`} onClick={() => openChat(user._id)}>
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
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                            <h1>
                                {user?.name}
                            </h1>
                            {getUnReadMsg(user)}
                        </div>
                        
                        {getLastMsg(user)}
                    </div>
                    
                </div>
                <div onClick={() => insertChats(user._id)}>
                     {!allChats.find((chat) =>
                 chat.members.map((mem) => mem._id).includes(user._id)
              ) && (
                <button className="border-primary border text-primary bg-white p-1 rounded">
                  Create Chat
                </button>
              )}
                </div>
            </div>
        )
     })}
    </div>
  )


}
 export default UsersList