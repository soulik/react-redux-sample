export interface ApifyParameters {
    storeName: string
}

export interface QueryParameters {
    baseUrl: string,
    pathFormatFn: (parameters: ApifyParameters) => string,
    parameters?: any,
    options?: Object
}

const ApifyBaseUrl = "https://api.apify.com"

export const latestDataPathFormatFunction = (parameters: ApifyParameters) => {
    return `v2/key-value-stores/${parameters['storeName']}/records/LATEST?disableRedirect=true`
}

//https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true

export const queryData = ({baseUrl=ApifyBaseUrl,
                              pathFormatFn=latestDataPathFormatFunction,
                              parameters={},
                              options={}}: QueryParameters) => {
    const path = pathFormatFn(parameters)
    const url = `${baseUrl}/${path}`

    return fetch(url, options)
        .then(data => {
            return data.json()
        })
        .catch(error => {
            console.error(error)
            console.log('Fetch error')
        })
}
