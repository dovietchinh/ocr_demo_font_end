import {createSlice} from "@reduxjs/toolkit"
import axios from "axios";

const initState = {
    'is_training': false,
    'genPercent': null,
    'trainingPercent': null,
    'progress': 0,
    'training_id':[],
    'uploadSamples': [],
    'modeDraw': false,
    'progressBar':false,
    'stateDraw':{
        'enable': false,
        'startpoint': null,
        'listRect': [],
        'listLabel': [],
    }
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
        actionSetCurrentPercent(state,action){
            state.genPercent = action.payload.genPercent
            state.trainingPercent = action.payload.trainingPercent
        },
        actionSetProgressBar(state,action){
            state.progressBar = action.payload
        },
        actionClearTraining(state,action){
            return {
                'is_training': false,
                'genPercent': null,
                'trainingPercent': null,
                'progress': 0,
                'training_id':[],
                'uploadSamples': [],
                'modeDraw': false,
                'progressBar':false,
                'stateDraw':{
                    'enable': false,
                    'startpoint': null,
                    'listRect': [],
                    'listLabel': [],
                }
            }
        },
        actionSetStateDraw(state,action){
            
            if(typeof(action.payload)=='function'){
                state.stateDraw = action.payload(state.stateDraw)
            }
            else{
                state.stateDraw = action.payload
            }
            
        }
    }
});

// const actionUploadSample = training_reducer.actions.actionUploadSample
// export {actionUploadSample}
export default training