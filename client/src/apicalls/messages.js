import { axiosInstance } from "."

export const sendMessage = async(message) => {
    try {
        const response = await axiosInstance.post('/messages/create-message', message)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getMessages = async(chatId) => {
    try {
        const response = await axiosInstance.get(`/messages/get-all-message/${chatId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}