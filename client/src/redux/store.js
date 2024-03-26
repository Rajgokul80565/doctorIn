import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import doctorReducer from "./slices/doctorSlice";
import userReducer from "./slices/userSlice";
import {apiSlice} from "./slices/apiSlice";


const store = configureStore({
    reducer:{
        auth:authReducer,
        doctor:doctorReducer,
        user:userReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
});


export default store;