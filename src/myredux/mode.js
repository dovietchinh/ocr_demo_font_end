import { createSlice } from "@reduxjs/toolkit";
import testing from "./testing";

const initState = {
    'mode':'training',
    'customer_ID': Math.floor(Math.random() * 1000)
}

const mode = createSlice({
    name: 'mode',
    initialState:initState,
    reducers : {
        switchMode(state,action){
            if (typeof(action.payload)=='undefine'){
                return state               
            }
            else{
                state.mode = action.payload
            }
        },
        actionClearMode(state,action){
            state.mode = 'training'
            state.customer_ID = Math.floor(Math.random() * 1000)
        },
        actionSetCustomerID(state,action){
            state.customer_ID = action.payload
        }

        
    }

})

export default mode