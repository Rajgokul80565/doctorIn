import {apiSlice} from "./apiSlice";
import {createSlice} from "@reduxjs/toolkit";

const USER_URL = "/api/users";


const initialState = {
    schedulesList:[],
    userResults:[],
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setSchedulesList:(state, action) => {
                state.schedulesList = action.payload;
        },
        setUserResults:(state, action) => {
            state.userResults = action.payload;
        }
    }
})


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login:builder.mutation({
            query:(data) => ({
                url:`${USER_URL}/auth`,
                method: 'POST',
                body: data,
            })
        }),
        logout:builder.mutation({
           query:() => ({
            url:`${USER_URL}/logout`,
            method: 'POST',
           })
        }),
        register:builder.mutation({
            query:(data) => ({
                url:`${USER_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        updateprofile:builder.mutation({
            query:(data) => ({
                url:`${USER_URL}/profile`,
                method:'PUT',
                body:data,
            })
        }),
        getdoctorlist:builder.mutation({
            query:(data) => ({
                url:`${USER_URL}/getdoctors`,
                method:'GET',
            })
        }),
        book:builder.mutation({
            query:(data) => ({
                url:`${USER_URL}/booking`,
                method:'POST',
                body:data,
            })
        }),
        getUserSchedule:builder.mutation({
            query:(data) => ({
                url:`${USER_URL}/getusersappoinments`,
                method:"GET",
            })
        }),
        doctorinfo:builder.mutation({
            query:(data) =>({
                url:`${USER_URL}/getDoctorDetails`,
                method:"POST",
                body:data,
            })
        }),
        getUserDetailsById:builder.mutation({
            query:(data)=> ({
                url:`${USER_URL}/getuserbyId`,
                method:"POST",
                body:data
            })
        }),
        getUserResult:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/getUserResult`,
                method:"POST",
                body:data,
            })
        })
    })
})

export const {setSchedulesList, setUserResults} = userSlice.actions;
export const {
    useLoginMutation,
     useLogoutMutation, 
    useRegisterMutation, 
    useUpdateprofileMutation,
    useGetdoctorlistMutation,
useBookMutation,
useGetUserScheduleMutation,
useDoctorinfoMutation,
useGetUserDetailsByIdMutation,
useGetUserResultMutation,
} = usersApiSlice;

export default userSlice.reducer;
