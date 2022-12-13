import {createSlice} from "@reduxjs/toolkit"
import axios from "axios";

const initState = {
    'selectModel': 0,
    'activeImage': null,
    'viewIndex':null,
    'uploadTestImages': [],
    'resultImages': [],

}

const testing = createSlice({
    name: 'testing',
    initialState : initState,
    reducers:{
        actionUploadTestImg(state,action){
            state.uploadTestImages.push(action.payload)
            state.activeImage = state.uploadTestImages.length - 1
        },
        actionSetActiveImage(state,action){
            state.activeImage = action.payload
        },
        actionSetReultImages(state,action){
            state.resultImages.push(action.payload)
        },
        actionSetViewIndex(state,action){
            state.viewIndex = action.payload
        }
    }
});

export default testing