import {apiSlice} from "./apiSlice";
import { createSlice } from '@reduxjs/toolkit';


const DOCTOR_URL = "/api/doctors";

const initialState = {
    doctorsList:[],
    appointmentList:[],
}

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers:{
        setDoctorsList:(state, action) => {
            state.doctorsList = action.payload;
        },
        setAppointmentList:(state, action) => {
            state.appointmentList = action.payload;
        }
    }

})


export const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        patientSchedules:builder.mutation({
            query:(data) => ({
                url:`${DOCTOR_URL}/patients-schedules`,
                method:"POST",
                body:data,
            })
        }),
        patientAttend:builder.mutation({
            query:(data) => ({
                    url:`${DOCTOR_URL}/attend-patient`,
                    method:"POST",
                    body:data,
            })
        })
    })
});


export const {setDoctorsList, setAppointmentList} = doctorSlice.actions;
export const {usePatientSchedulesMutation, usePatientAttendMutation} = doctorApiSlice;
export default doctorSlice.reducer;
