import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userdata: null,
    loginStatus: false
}

const slice = createSlice({
    name: "HomestaySlice",
    initialState: initialState,

    reducers: {
        login : (state, action) =>{
            console.log("In SLice ", action.payload);
            
            state.userdata = action.payload.userdata
            state.loginStatus = true

            console.log("State ", state.userdata);
            console.log("Status ", state.loginStatus);
        },
        logout : (state, action) =>{
            state.userdata = null
            state.loginStatus = false
        }
    }
});

export const {login, logout} = slice.actions
export default slice.reducer