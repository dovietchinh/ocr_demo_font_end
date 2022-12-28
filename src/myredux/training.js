import {createSlice} from "@reduxjs/toolkit"
import axios from "axios";

const initState = {
    'trainingFlag': false,
    'genPercent': null,
    'trainingPercent': null,
    'progress': 0,
    'uploadSamples': [],
    'modeDraw': false,
    'progressBar':false,
    // 'stateDraw':{
    //     'enable': false,
    //     'startpoint': null,
    //     'listRect': [],
    //     'listLabel': [],
    // },
    'stateDraw': [],
    'activeIndex': 0,
    'currentTrainingModel': "",
    'listLabels': [],
}



const training = createSlice({
    name: 'training',
    initialState : initState,
    reducers:{
        actionSetListLabels(state,action){
            

            if(typeof(action.payload)=='function'){
                
                state.listLabels = action.payload(state.listLabels)
            }
            else{
                state.listLabels = action.payload
            }
            
        },
        actionAddListLabels(state,action){
                // state.listLabels.push = action.payload    
                return {
                    ...state,
                    listLabels: [...state.listLabels,action.payload]
                }
                
        },
        actionRemoveListLabels(state,action){
            state.listLabels.splice(action.payload,1)
        },
        actionUploadSamples(state,action){
            state.uploadSamples.push(action.payload)
            state.stateDraw.push(
                {
                    'enable': false,
                    'startpoint': null,
                    'listRect': [],
                    'listLabel': [],
                }
            )
        },
        actionRemoveUploadSample(state,action){
            state.uploadSamples.splice(action.payload,1)
            state.stateDraw.splice(action.payload,1)
        },
        actionSetActiveIndex(state,action){
            state.activeIndex =  action.payload
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
        actionSetTrainingFlag(state,action){
            state.trainingFlag = action.payload
        },
        actionSetCurrentTrainingModel(state,action){
            state.currentTrainingModel = action.payload
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
                // 'stateDraw':{
                //     'enable': false,
                //     'startpoint': null,
                //     'listRect': [],
                //     'listLabel': [],
                // }
                'stateDraw': []
            }
        },
        actionSetStateDraw(state,action){
            
            if(typeof(action.payload)=='function'){
                
                state.stateDraw[state.activeIndex] = action.payload(state.stateDraw[state.activeIndex])
            }
            else{
                state.stateDraw[state.activeIndex] = action.payload
            }
            
        }
    }
});

// const actionUploadSample = training_reducer.actions.actionUploadSample
// export {actionUploadSample}
export default training