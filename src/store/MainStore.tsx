import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {configureStore} from "@reduxjs/toolkit";
import AppSlice, {AppState} from "../reducers/slices/AppSlice";
import DynamicDataSlice, {DynamicDataState} from "../reducers/slices/DynamicDataSlice";

export interface MainState {
    app: AppState,
    dynamicData: DynamicDataState,
}

export const MainStore = configureStore({
    reducer: {
        app: AppSlice,
        dynamicData: DynamicDataSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(thunkMiddleware)
})
