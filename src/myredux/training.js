import {createSlice} from "@reduxjs/toolkit"
import axios from "axios";

const initState = {
    'is_training': false,
    'progress': 0,
    'training_id':[],
    'uploadSamples': [],
    'modeDraw': false,
}

const training = createSlice({
    name: 'training',
    initialState : initState,
    reducers:{
        actionUploadSamples(state,action){
            state.uploadSamples.push(action.payload)
        },
        actionSwitchModeDraw(state,action){
            if(typeof(action.payload)=="undefined"){
                return {
                    ...state,
                    'modeDraw':!state.modeDraw
                }
            }
            else{
                return {
                    ...state,
                    'modeDraw':action.payload
                }
            }
        },
        actionStartTraining(state,action){
            // axios.post('http://127.0.0.1:9000:/api/v1/start_training')
            state.is_training = true
            state.training_id.push(action.payload)
        },
        actionStopTraining(state,action){
            // axios.post('http://127.0.0.1:9000:/api/v1/start_training')
            state.is_training = false
            state.training_id = null
        },
    }
});

// const actionUploadSample = training_reducer.actions.actionUploadSample
// export {actionUploadSample}
export default training