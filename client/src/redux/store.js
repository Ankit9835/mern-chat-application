import { configureStore } from "@reduxjs/toolkit";
import loadReducer from './loaderSlice'
import userReducer from './userSlice'

const store = configureStore({
    reducer:{
        loadReducer,
        userReducer
    }
})

export default store