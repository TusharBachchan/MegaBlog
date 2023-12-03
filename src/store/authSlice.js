// This slice is to know if the user is authenticated or not
// We keep asking the store to know the user's status of authentication
import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    status: false, // By default we assume user is not authenticated
    userData: null // By default we have no user data 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }

})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;