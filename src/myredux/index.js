import mode from './mode'
import testing from './testing';
import training from './training';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
const { configureStore } = require("@reduxjs/toolkit");
const { combineReducers } = require("redux");


const reducers = combineReducers({
    training: training.reducer,
    testing: testing.reducer,
    mode: mode.reducer
})
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)
const store = configureStore({
    'reducer':persistedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})
const persistor = persistStore(store)
export {mode,testing,training}
export {persistor}
export default store
