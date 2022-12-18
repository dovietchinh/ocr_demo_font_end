import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import testing from "./testing";

const initState = {
    'mode':'training',
    'customer_ID': '1',
    'toastText': "asd",
    'toastMode': false,
    'loadingMode': false,
    'login': false,
    'modeLoginSuccess':false,
}

export const login = createAsyncThunk(
    'mode/actionSetLoadingMode',
    async (userId, thunkAPI)=>{
        console.log(userId)
        const r = await axios.get('http://10.124.69.195:18000/api/v1/count')
        return r.data
    }
)

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
                // if(action.payload=='training'){
                //     // state.toastText='training'
                //     // state.toastMode = true
                //     // state.loadingMode = true
                //     // setTimeout(()=>{state.toastMode = false},5000)
                //     state.customer_ID = Math.floor(Math.random() * 1000)
                // }
                // else{
                //     // state.toastText='testing'
                //     // state.toastMode = false
                //     // state.loadingMode = false
                //     state.customer_ID = 0

                // }
            }
        },
        actionSetModeLoading(state,action){
            state.loadingMode = action.payload
        },
        actionSetModeLoginSuccess(state,action){
            state.modeLoginSuccess = action.payload
        },
        actionSetLoadingMode(state,action){
            state.loadingMode = action.payload
        },
        actionClearMode(state,action){
            state.mode = 'training'
            // state.customer_ID = Math.floor(Math.random() * 1000)
        },
        actionSetCustomerID(state,action){
            state.customer_ID = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending, (state,action)=>{
                    // state.mode.loadingState = true
                    state.asdasd = 10
                    console.log('action pending.....')
                    console.log('action.type: ',action.type)
                    console.log('action.payload: ',action.payload)
                })
                .addCase(login.fulfilled,(state,action)=>{
                    state.
                    console.log('action fullfield.....')
                    console.log('action.type: ',action.type)
                    console.log('action.payload: ',action.payload)
                })
                .addCase(login.rejected,(state,action)=>{
                    console.log('action rejected.....')
                    console.log('action.type: ',action.type)
                    console.log('action.payload: ',action.payload)
                })
    }

})

export default mode