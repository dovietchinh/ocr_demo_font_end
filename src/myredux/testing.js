import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
const initState = {
    'selectModel': 0,
    'activeImage': null,
    'viewIndex':null,
    'uploadTestImages': [],
    'resultImages': [],
    'resultFeatures': [],
}
const asyncActionInfer = createAsyncThunk(
    'testing/asyncActionInfer',
    async (payload,thunkAPI)=>{
        let state = thunkAPI.getState()
        let test_json = {
            customer_ID: state.mode.selectedModel,
            image_info: [payload],
        }
        let results;
        const response = await axios.
            post('http://10.124.64.125:18001/api/v1/infer',test_json)
            .then((r)=>{
                console.log(r.data)
                console.log('asd')
                results = {
                    origin:r.data.original_image_path,
                    result: r.data.image_result_paths,
                    feature: r.data.features
                }
            })
            .catch((e)=>{
                console.log(e)
                results = {
                    origin:payload,
                    result: [],
                    feature: [],
                }
            })
        return results
    }
)    
const testing = createSlice({
    name: 'testing',
    initialState : initState,
    reducers:{
        actionUploadTestImg(state,action){
            state.uploadTestImages.push(action.payload)
            state.activeImage = state.uploadTestImages.length - 1
        },
        actionDeleteTestImages(state,action){
            state.uploadTestImages.splice(action.payload,1)
            state.resultImages.splice(action.payload,1)
        },
        actionSetActiveImage(state,action){
            state.activeImage = action.payload
        },
        actionSetResultImages(state,action){
            // if(state.resultImages.length < state.uploadTestImages.length){
            state.resultImages.push(action.payload)
            // }
        },
        actionSetViewIndex(state,action){
            state.viewIndex = action.payload
        },
        actionAddViewIndex(state,action){
            state.viewIndex += action.payload
        },
        actionSubViewIndex(state,action){
            state.viewIndex -= action.payload
        },
        actionClearTesting(state,action){
            return {
                'selectModel': 0,
                'activeImage': null,
                'viewIndex':null,
                'uploadTestImages': [],
                'resultImages': [],
                'resultFeatures': [],
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(asyncActionInfer.pending,(state,action)=>{
            // state.uploadTestImages.push(action.payload.origin)
            // state.resultImages.push(action.payload.result)
            // state.resultFeatures.push(action.payload.feature)
            // state.activeImage = state.uploadTestImages.length - 1
            // alert('infer start')
        })
        builder.addCase(asyncActionInfer.fulfilled,(state,action)=>{
            state.uploadTestImages.push(action.payload.origin)
            state.resultImages.push(action.payload.result)
            state.resultFeatures.push(action.payload.feature)
            state.activeImage = state.uploadTestImages.length - 1
            // alert('infer done!')
        })
    }
});
export {asyncActionInfer}
export default testing