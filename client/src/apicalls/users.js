import { axiosInstance } from ".";

export const LoginUser = async (user) => {
    try {
        const response = await axiosInstance.post(`users/login`, user)
        console.log(response)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const RegisterUser = async (user) => {
  try {
    const response = await axiosInstance.post("users/register", user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const currentUser = async () => {
  try {
    const response = await axiosInstance.get("users/get-current-user");
    console.log('test',response)
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("users/get-all-users");
    console.log('uuuuuuuuuuu',response.data)
    return response.data
  } catch (error) {
    console.log(error.response.data)    
  }
}