import {createStore ,combineReducers, applyMiddleware } from "redux"
// import { configureStore } from '@reduxjs/toolkit'
// import thunk from "react-thunk";
import thunk from "redux-thunk"
import riderReducer from "./reducers";


    const rootReducer = combineReducers({riderReducer})

    export const Store = createStore(rootReducer, applyMiddleware(thunk));
    
// export const Store = configureStore({
//     rootReducer, 
//     applyMiddleware(thunk),
// });