import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers : {
        setCrenditails: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
        clearCreditails:(state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        }
    }
})

export const {setCrenditails, clearCreditails} = authSlice.actions;
export default authSlice.reducer;