import { createSlice } from "@reduxjs/toolkit";

const initState = {
    'mode':'training',
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
        }
        
    }

})

export default mode