import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{
        allUser: [],
        user:null,
    },
    reducers:{
        SetUser: (state,action) => {
            state.user = action.payload
        },
        SetAllUsers: (state,action) => {
            state.allUser = action.payload
        }
    }
})

export const {SetUser, SetAllUsers} = userSlice.actions
export default userSlice.reducer