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
        })
    })
})


export const {
    useLoginMutation,
     useLogoutMutation, 
    useRegisterMutation, 
    useUpdateprofileMutation,
    useGetdoctorlistMutation
} = usersApiSlice;
