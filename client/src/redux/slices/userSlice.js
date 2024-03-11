import {apiSlice} from "./apiSlice";

const USER_URL = "/api/users";


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
    })
})


export const {
    useLoginMutation,
     useLogoutMutation, 
    useRegisterMutation, 
    useUpdateprofileMutation,
    useGetdoctorlistMutation,
useBookMutation,
useGetUserScheduleMutation,
useDoctorinfoMutation,
useGetUserDetailsByIdMutation
} = usersApiSlice;
