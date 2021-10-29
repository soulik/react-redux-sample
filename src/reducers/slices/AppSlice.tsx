import {createSlice} from "@reduxjs/toolkit";

export interface AppState {
    testValue: number
}

const initialState = {
    testValue: 1,
} as AppState

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addValue: (state, action) => {
            return {
                 ...state,
                 testValue: state.testValue + parseInt(action.payload.value)
             }
        },
        resetValue: (state, action) => {
                return {
                 ...state,
                 testValue: 0
             }
        }
    }
})

const { actions, reducer } = AppSlice
export const { addValue, resetValue } = actions
export default reducer