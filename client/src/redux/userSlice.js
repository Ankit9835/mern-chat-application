import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{
        allUser: [],
        user:null,
        allChats: [],
        selectedChats: null
    },
    reducers:{
        SetUser: (state,action) => {
            state.user = action.payload
        },
        SetAllUsers: (state,action) => {
            state.allUser = action.payload
        },
        SetAllChats: (state,action) => {
            state.allChats = action.payload
        },
        SetSelectedChats: (state,action) => {
            state.selectedChats = action.payload
        },
    }
})

export const {SetUser, SetAllUsers, SetAllChats, SetSelectedChats} = userSlice.actions
export default userSlice.reducer