import {createSlice} from "@reduxjs/toolkit"
import axios from "axios";
const initState = {
    'selectModel': 0,
    'activeImage': null,
    'viewIndex':null,
    'uploadTestImages': [],
    'resultImages': [],
}
const asyncActionInfer = createAsyncThunk(
    'testing/asyncActionInfer',
    async (payload,thunkAPI)=>{
        state = thunkAPI.getState()
        let test_json = {
            customer_ID: state.mode.selectedModel,
            image_info: [payload],
        }
        console.log(test_json.customer_ID)
        let results;
        const response = await axios.
            post('http://10.124.64.125:18001/infer',test_json)
            .then((r)=>{
                console.log(r.data)
                let data = r.data.image_result_paths
                thunkAPI.dispatch(testing.actions.actionSetResultImages(data))
                results = r.data.image_save_paths
            })
            .catch((e)=>{
                console.log(e)
                results = payload
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
            if(state.resultImages.length < state.uploadTestImages.length){
                state.resultImages.push(action.payload)
            }
        },
        actionSetViewIndex(state,action){
            state.viewIndex = action.payload
        },
        actionClearTesting(state,action){
            return {
                'selectModel': 0,
                'activeImage': null,
                'viewIndex':null,
                'uploadTestImages': [],
                'resultImages': [],
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(asyncActionInfer.fulfilled,(state,action)=>{
            state.uploadTestImages.push(action.payload)
            state.activeImage = state.uploadTestImages.length - 1
        })
    }
});
export {asyncActionInfer}
export default testing