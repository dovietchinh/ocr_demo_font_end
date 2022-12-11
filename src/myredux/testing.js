import {createSlice} from "@reduxjs/toolkit"
import axios from "axios";

const initState = {
    'img': null,
    'selectModel': 0,
}

const testing = createSlice({
    name: 'testing',
    initialState : initState,
    reducers:{
        actionUploadTestImg(state,action){
            state.img = action.payload
        },
    }
});

// const actionUploadTestImg = testing_reducer.actions.actionUploadTestImg

// export {actionUploadTestImg}
export default testing