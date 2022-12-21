import mode from './mode'
import testing from './testing';
import training from './training';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import axios from 'axios';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
const { configureStore, createAsyncThunk } = require("@reduxjs/toolkit");
const { combineReducers } = require("redux");

const middleWareLogin = store => next => action =>{
    if(action.type=='mode/actionSetModeLoginSuccess'){
        if(action.payload==true){
            alert('login success!')
        }
        else{
            alert('logout success')
        }
    }
    next(action)
}
const middleWareChangeSelectedModel = store => next => action => {
    if(action.type=='mode/actionSetSelectedModel'){
        let ReloadAPI = async () =>{
            store.dispatch(mode.actions.actionSetLoadingMode(true))
            await axios.post('http://10.124.64.125:18002/convert',{customer_ID:action.payload})
                .then((r)=>{
                    console.log('convert done')
                    console.log(r.data)
                })
                .catch((error)=>{
                    console.log('error convert: ',error)
                })
            await axios.post('http://10.124.64.125:18002/reload_models',{customer_ID:action.payload})
                .then((r)=>{
                    console.log('reload models done!')
                })
                .catch((error)=>{
                    console.log('error reload: ',error)
                })
            store.dispatch(mode.actions.actionSetLoadingMode(false))
            // store.dispatch(mode.actions.actionSetToastMode({toastText:'loading model done!',toastMode:true}))
            // setTimeout(()=>{mode.actions.actionSetToastMode({toastText:'loading model done!',toastMode:false})},5000)
            
        }
        ReloadAPI()
    }
    next(action)
}
const middleWareToast = store => next => action => {
    if(action.type=='mode/actionSetLoadingMode' & action.payload==true){
        store.dispatch(mode.actions.actionSetLoadingMode(false))
    }
    next(action)
}
const middleWareCheckDone = store => next => action => {
    if(action.type=='training/actionSetCurrentPercent'){
        if(action.payload.trainingPercent>0.99){
            store.dispatch(mode.actions.actionSetToastMode(true))
            store.dispatch(training.actions.actionSetTrainingFlag(false))
        }
        else{
            store.dispatch(training.actions.actionSetTrainingFlag(true))
        }
        
    }
    next(action)
}




const reducers = combineReducers({
    training: training.reducer,
    testing: testing.reducer,
    mode: mode.reducer
})
const persistConfig = {
    key: 'root',
    storage:storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['mode']
}
const persistedReducer = persistReducer(persistConfig, reducers)
const store = configureStore({
    // 'reducer':reducers,
    'reducer':persistedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleWareLogin,middleWareChangeSelectedModel,middleWareCheckDone,thunk),
})
const persistor = persistStore(store)
export {mode,testing,training}
export {persistor}
export default store
