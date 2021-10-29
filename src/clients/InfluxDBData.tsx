import {InfluxDB, FluxTableMetaData} from '@influxdata/influxdb-client'

const url = ''
const token = ''
const org = ''

const queryApi = new InfluxDB({url, token}).getQueryApi(org)

export interface QueryParameters {
    bucket?: string,
    range?: string,
    measurement?: string,
    field?: string,
    aggregateWindow?: string,
    filter?: string
}

export const queryData = ({bucket = "", range = "-6h", measurement = "cpu", field = "usage_user", aggregateWindow="30s", filter='r["cpu"] == "cpu-total"'}: QueryParameters) => {
    const fluxQuery =
        `from(bucket: "${bucket}")
  |> range(start: ${range})
  |> filter(fn: (r) => r["_measurement"] == "${measurement}")
  |> filter(fn: (r) => r["_field"] == "${field}")
  |> filter(fn: (r) => ${filter})
  |> aggregateWindow(every: ${aggregateWindow}, fn: mean, createEmpty: false)
  |> yield(name: "mean")`

    return queryApi.collectRows(fluxQuery)
        .then(data => {
            return data
        })
        .catch(error => {
            console.error(error)
            console.log('\nCollect ROWS ERROR')
        })
}
