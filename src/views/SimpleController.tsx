import {AppContainer} from "../containers/App";
import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Button, Grid, TextField, Typography} from "@mui/material";
import {fetchValues} from "../reducers/slices/DynamicDataSlice";

const selectTestValue = (state: any) => state.app.testValue

export const SimpleController: React.FC = () => {
    const testValue = useSelector(selectTestValue)

    const dispatch = useDispatch()
    const [valueModifier, setValueModifier] = useState(0)

    const updateTestValue = (e: any) => {
        e.stopPropagation()
        dispatch({type: "app/addValue", payload: {value: valueModifier}})
        setValueModifier(0)
    }

    const resetTestValue = (e: any) => {
        e.stopPropagation()
        dispatch({type: "app/resetValue", payload: {}})
        setValueModifier(0)
    }

    const handleValueModifierChange = (e: any) => {
        setValueModifier(e.target.value)
    }

    const updateDynamicData = async () => {
        try {
            const result = await dispatch(fetchValues())
            //console.log('Success')
        } catch(error: any) {
            console.log('Failure: ' + error.message)
        }
    }

    return (
        <AppContainer>
            <Typography variant={"body1"}>
                Hello world on test page #1!
            </Typography>
            <Typography variant={"body2"}>
                Test value currently is: {testValue}
            </Typography>
            <Typography variant={"body2"}>
                <form onSubmit={updateTestValue}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item md={12}>
                            <TextField id="test-value" label="Add value" variant="standard" value={valueModifier} onChange={handleValueModifierChange}/>
                        </Grid>
                        <Grid container item md={12} spacing={1}>
                            <Grid item md={2}>
                                <Button variant="outlined" onClick={updateTestValue}>Add value</Button>
                            </Grid>
                            <Grid item md={2}>
                                <Button variant="outlined" onClick={resetTestValue}>Reset value</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Typography>
        </AppContainer>
    )
}