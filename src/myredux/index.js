import mode from './mode'
import testing from './testing';
import training from './training';
const { configureStore } = require("@reduxjs/toolkit");
const { combineReducers } = require("redux");

const reducers = combineReducers({
    training: training.reducer,
    testing: testing.reducer,
    mode: mode.reducer
})

const store = configureStore({
    'reducer':reducers
})
export {mode,testing,training}
export default store
