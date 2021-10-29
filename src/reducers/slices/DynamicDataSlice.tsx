import {queryData, QueryParameters} from "../../clients/ApifyData";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

enum ValueState {
    Idle,
    Pending,
    Error
}

export interface DynamicDataState {
    values: any,
    valuesState: ValueState,
    valuesError: any,
    queryParameters: QueryParameters
}

const initialState = {
    values: [],
    valuesState: ValueState.Idle,
    valuesError: null,
    queryParameters: {
        parameters: {
            storeName: "tVaYRsPHLjNdNBu7S"
        }
    }
} as DynamicDataState

export const fetchValues = createAsyncThunk<any, void, {state: any}>(
    'dynamicData/fetchValues',
    async (arg, thunkApi) => {
        const { dynamicData } = thunkApi.getState()
        const { valuesState, queryParameters } = dynamicData

        if ( valuesState !== ValueState.Pending ) {
            return
        } else {
            try {
                return await queryData(queryParameters)
            } catch (err: any) {
                console.error(err.message)
            }
            return {}
        }
    })

const DynamicDataSlice = createSlice({
    name: 'dynamicData',
    initialState,
    reducers: {
        setValues: (state, action) => {
            return {
                ...state,
                values: action.payload
            }
        },
        setQueryParams: (state, action) => {
            return {
                ...state,
                queryParameters: {
                    ...state.queryParameters,
                    ...action.payload
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchValues.pending, (state, action) => {
            if (state.valuesState === ValueState.Idle ) {
                state.valuesState = ValueState.Pending
            }
        })
        builder.addCase(fetchValues.fulfilled, (state, action) => {
            if (state.valuesState === ValueState.Pending ) {
                state.values = action.payload
                state.valuesState = ValueState.Idle
            }
        })
        builder.addCase(fetchValues.rejected, (state, action) => {
            if (state.valuesState === ValueState.Pending ) {
                state.valuesError = action.error
                state.valuesState = ValueState.Idle
            }
        })
    }
})

const { actions, reducer } = DynamicDataSlice
export const { setValues } = actions
export default reducer