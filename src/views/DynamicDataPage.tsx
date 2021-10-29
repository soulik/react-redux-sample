import {AppContainer} from "../containers/App";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Grid, Typography} from "@mui/material";
import {fetchValues} from "../reducers/slices/DynamicDataSlice";
import {QueryParameters} from "../clients/ApifyData";
import BarChart from "../components/BarChart";

const selectMeasuredValues = (state: any) => state.dynamicData.values

export const DynamicDataPage: React.FC = () => {
    const measuredValues = useSelector(selectMeasuredValues)

    const dispatch = useDispatch()

    const updateDynamicData = async () => {
        try {
            const result = await dispatch(fetchValues())
            //console.log('Success')
        } catch(error: any) {
            console.log('Failure: ' + error.message)
        }
    }

    // First initial update
    useEffect(() => {
        updateDynamicData()
    },[])

    // Invoke successive updates every 10 seconds
    useEffect(() => {
        const timer = setTimeout(
            updateDynamicData,
            10000
        );
        return () => clearTimeout(timer);
    })

    return (
        <AppContainer>
            <Grid container justifyContent={"center"} spacing={2}>
                <Grid item md={12}>
                    <Typography variant={"body1"}>
                        Covid-19 Data - Number of infected people
                    </Typography>
                    <Typography variant={"body1"}>
                        <a href={"https://apify.com/covid-19"}>Apify - COVID-19</a>
                    </Typography>
                </Grid>
                <Grid item md={12} justifyContent={"center"}>
                    <BarChart
                        width={1200}
                        height={480}
                        data={measuredValues}
                    />
                </Grid>
            </Grid>
        </AppContainer>
    )
}