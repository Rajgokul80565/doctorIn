import {apiSlice} from "./apiSlice";


const DOCTOR_URL = "/api/doctors";


export const doctorSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        patientSchedules:builder.mutation({
            query:(data) => ({
                url:`${DOCTOR_URL}/patients-schedules`,
                method:"POST",
                body:data,
            })
        }),
    })
})

export const {usePatientSchedulesMutation} = doctorSlice;