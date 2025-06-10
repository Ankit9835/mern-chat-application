import { axiosInstance } from "."

export const getAllChats = async () => {
    try {
        const response = await axiosInstance.get('chats/get-all-chat')
        console.log('chats',response)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export const createChats = async (members) => {
     try {
    const response = await axiosInstance.post("chats/create-new-chat", {
      members,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const ClearChatMessages = async (chatId) => {
  try {
    const response = await axiosInstance.post("chats/clear-unread-messages", {
      chat: chatId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}